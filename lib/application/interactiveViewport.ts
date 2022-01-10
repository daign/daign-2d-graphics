import { ScrollHandle } from '@daign/handle';
import { Vector2 } from '@daign/math';

import { ITargetContext } from '../iTargetContext';

import { Application } from './application';
import { Viewport } from './viewport';

/**
 * Group that acts as an interactive viewport by applying a transformation from user input.
 */
export class InteractiveViewport extends Viewport {
  // The object that handles the events on the viewport node.
  private viewportHandle: ScrollHandle | undefined = undefined;

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

      // The object that handles the events on the viewport node.
      const handleConfig = { startNode: context.domNode, minimumDragDistance, extractFromEvent };
      const handle = new ScrollHandle( handleConfig );
      this.viewportHandle = handle;

      // Define pan action.
      handle.beginning = (): boolean => {
        this.viewCenter.snap();
        return true;
      };

      handle.continuing = (): void => {
        const drag = handle.delta.clone().multiplyScalar( -1 / this.viewScale );
        this.viewCenter.drag( drag );

        this.updateViewport();
        this.application.createControls();
        this.redrawObservable.notify();
      };

      // Define action to deactivate element.
      handle.clicked = (): void => {
        this.application.deactivateElement();
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
