import { MultiTouchScrollHandle } from '@daign/handle';
import { Matrix3, Vector2 } from '@daign/math';

import { ITargetContext } from '../iTargetContext';

import { Application } from './application';
import { Viewport } from './viewport';

/**
 * Group that acts as an interactive viewport by applying a transformation from user input.
 */
export class InteractiveViewport extends Viewport {
  // The object that handles the events on the viewport node.
  private viewportHandle: MultiTouchScrollHandle | undefined = undefined;

  /**
   * Get a vector from the touch position of an event relative to the drawing's context.
   * Will throw error when the event does not contain position information.
   * @param event - The event to use.
   * @param touchIndex - The index of the touch point.
   * @returns The resulting vector.
   */
  private extractFromTouchEventRelativeToContext = ( event: any, touchIndex: number ): Vector2 => {
    if (
      !this.context.domNode ||
      !this.context.domNode.getBoundingClientRect
    ) {
      throw new Error( 'Unable to read offset of context node.' );
    }

    // Get the offset of the context node relative to the page.
    const rect = this.context.domNode.getBoundingClientRect();
    if (
      !rect ||
      rect.left === undefined ||
      rect.top === undefined
    ) {
      throw new Error( 'Unable to read offset of context node.' );
    }

    if (
      !event ||
      !event.touches ||
      !event.touches[ touchIndex ] ||
      event.touches[ touchIndex ].pageX === undefined ||
      event.touches[ touchIndex ].pageY === undefined
    ) {
      throw new Error( 'Unable to extract position from event.' );
    }

    /* Calculate position relative to context node by subtracting the target's offset from the touch
     * position on the page. */
    const x = event.touches[ touchIndex ].pageX - rect.left;
    const y = event.touches[ touchIndex ].pageY - rect.top;
    return new Vector2( x, y );
  };

  /**
   * Constructor.
   * @param context - The target context.
   * @param application - The corresponding application.
   */
  public constructor( context: ITargetContext, application: Application ) {
    super( context, application );

    if ( context.domNode ) {
      const minimumDragDistance = 5;
      const extractFromEvent = ( event: any ): Vector2 => {
        return new Vector2().setFromEventRelative( event );
      };
      const extractFromTouchEvent = this.extractFromTouchEventRelativeToContext;

      // The object that handles the events on the viewport node.
      const handle = new MultiTouchScrollHandle();
      handle.setStartNode( context.domNode );
      handle.minimumDragDistance = minimumDragDistance;
      handle.extractFromEvent = extractFromEvent;
      handle.extractFromTouchEvent = extractFromTouchEvent;

      this.viewportHandle = handle;

      let viewScaleSnapshot: number;
      let transformationSnapshot: Matrix3;

      handle.beginning = (): boolean => {
        // Save snapshots of center and scale values at drag start.
        this.viewCenter.snap();
        viewScaleSnapshot = this.viewScale;
        transformationSnapshot = this.transformation.inverseTransformMatrix.clone();
        return true;
      };

      handle.continuing = (): void => {
        const startPosition1 = handle.getStartPosition( 0 );
        const startPosition2 = handle.getStartPosition( 1 );
        const tempPosition1 = handle.getTempPosition( 0 );
        const tempPosition2 = handle.getTempPosition( 1 );
        const delta1 = handle.getDelta( 0 );

        // When there are two positions, then it is a multi touch event. Zoom the viewport.
        if (
          startPosition1 !== undefined && startPosition2 !== undefined &&
          tempPosition1 !== undefined && tempPosition2 !== undefined &&
          this.viewCenter.snapshot !== undefined
        ) {
          // Calculate the distances between the touch points at start and current position.
          let distanceStart = startPosition2.clone().sub( startPosition1 ).length();
          let distanceTemp = tempPosition2.clone().sub( tempPosition1 ).length();

          // Distance between touch point should not be zero, should be at least 1.
          distanceStart = Math.max( distanceStart, 1 );
          distanceTemp = Math.max( distanceTemp, 1 );

          // Zooming by relative distance change between touch points.
          const zoomFactor = distanceTemp / distanceStart;
          const newScale = viewScaleSnapshot * zoomFactor;
          this.viewScale = Math.max( 0.01, Math.min( 1000, newScale ) );

          const transformedTempPosition1 = tempPosition1.clone()
            .transform( transformationSnapshot );
          const transformedstartPosition1 = startPosition1.clone()
            .transform( transformationSnapshot );

          // The new center is calculated so that touch points keep the location that they point to.
          const newCenter = this.viewCenter.snapshot.clone()
            .sub( transformedTempPosition1 )
            .multiplyScalar( 1 / zoomFactor )
            .add( transformedstartPosition1 );
          this.viewCenter.copy( newCenter );
        } else if ( delta1 !== undefined ) {
          // When there is one position only, then pan the viewport.
          const drag = delta1.clone().multiplyScalar( -1 / this.viewScale );
          this.viewCenter.drag( drag );
        }

        this.updateViewport();
        this.application.createControls();
        this.redrawObservable.notify();
      };

      // Define action to deactivate element.
      handle.clicked = (): void => {
        this.application.selectionManager.setSelection( null, null );
        this.redrawObservable.notify();
      };

      // Define zoom action.
      handle.scrolling = (): void => {
        const sign = Math.sign( handle.scroll.y );
        let factor = Math.pow( 1.1, -sign );

        const oldScale = this.viewScale;
        this.viewScale = Math.max( 0.01, Math.min( 1000, oldScale * factor ) );
        factor = this.viewScale / oldScale;

        const mousePosition = handle.scrollPosition.clone();
        mousePosition.transform( this.transformation.inverseTransformMatrix );
        this.viewCenter.sub( mousePosition ).multiplyScalar( 1 / factor ).add( mousePosition );

        this.updateViewport();
        this.application.createControls();
        this.redrawObservable.notify();
      };
    }
  }

  /**
   * Enable or disable the viewport actions like panning and zooming.
   * @param enabled - Whether to enable or disable the actions.
   */
  public enableViewportActions( enabled: boolean ): void {
    if ( this.viewportHandle ) {
      this.viewportHandle.enabled = enabled;
    }
  }
}
