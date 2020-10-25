import { Handle } from '@daign/handle';
import { Vector2 } from '@daign/math';
import { MatrixTransform } from '@daign/2d-pipeline';
import { Observable } from '@daign/observable';

import { ITargetContext } from '../iTargetContext';
import { Application } from './application';
import { Group } from '../basic-elements/group';

// Observable implementation with a public notify method.
class ObservableObject extends Observable {
  public constructor() {
    super();
  }
  public notify(): void {
    this.notifyObservers();
  }
}

/**
 * Group that acts as an interactive viewport by applying a transformation from user input.
 */
export class InteractiveViewport extends Group {
  // The target drawing context.
  private context: ITargetContext;

  // The corresponding application.
  private application: Application;

  // The transformation applied to the view's content.
  private viewTransformation: MatrixTransform = new MatrixTransform();

  // Content coordinates at the center of the viewport.
  private viewCenter: Vector2 = new Vector2();

  // Scaling of the viewport content.
  private viewScale: number = 1;

  // Observable to signal redraw execution.
  public redrawObservable: ObservableObject = new ObservableObject();

  /**
   * Constructor.
   * @param context - The target context.
   */
  public constructor( context: ITargetContext, application: Application ) {
    super();

    this.context = context;
    this.application = application;

    // Set center of target's drawing space as center.
    this.viewCenter.copy( context.size ).multiplyScalar( 0.5 );

    this.transformation.append( this.viewTransformation );

    if ( context.domNode ) {
      // Define pan action.
      const handle = new Handle( context.domNode );
      handle.beginning = (): boolean => {
        this.viewCenter.snap();
        return true;
      };

      handle.continuing = (): void => {
        const drag = handle.delta.clone().multiplyScalar( -1 / this.viewScale );
        this.viewCenter.drag( drag );

        this.updateViewport();
        this.application.controlLayer.createControls();
        this.redrawObservable.notify();
      };

      handle.clicked = (): void => {
        this.application.controlLayer.deactivateElement();
        this.redrawObservable.notify();
      };

      // Define zoom action.
      const onMouseWheel = ( event: any ): boolean => {
        const sign = Math.sign( event.deltaY );
        let factor = Math.pow( 1.1, -sign );

        const oldScale = this.viewScale;
        this.viewScale = Math.max( 0.01, Math.min( 1000, oldScale * factor ) );
        factor = this.viewScale / oldScale;

        const mousePosition = new Vector2().setFromEventRelative( event );
        mousePosition.transform( this.transformation.inverseTransformMatrix );
        this.viewCenter.sub( mousePosition ).multiplyScalar( 1 / factor ).add( mousePosition );

        this.updateViewport();
        this.application.controlLayer.createControls();
        this.redrawObservable.notify();

        event.preventDefault();
        event.stopPropagation();
        return false;
      };
      context.domNode.addEventListener( 'wheel', onMouseWheel, false );
    }
  }

  /**
   * Set view center and scale so that the content is fully zoomed in the center of the viewport.
   */
  public fitToContent(): void {
    const contentBox = this.getBox();
    // Expand area of interest by margin.
    contentBox.expandByScalar( 2 );

    const scaling = this.context.size.clone().divide( contentBox.size );
    // Scaling should be the same in both directions.
    this.viewScale = Math.min( scaling.x, scaling.y );

    this.viewCenter.copy( contentBox.min ).add( contentBox.size.clone().multiplyScalar( 0.5 ) );

    this.updateViewport();
  }

  /**
   * Calculate and apply the transformations that result from the view center and scale properties.
   */
  private updateViewport(): void {
    // Move the center of the view to (0,0) to keep it unaffected from the scaling.
    const decentering = new Vector2( -this.viewCenter.x, -this.viewCenter.y );

    const scaling = new Vector2( this.viewScale, this.viewScale );
    const translation = this.context.size.clone().multiplyScalar( 0.5 );

    this.viewTransformation.matrix.setIdentity();
    this.viewTransformation.matrix.applyTranslation( decentering );
    this.viewTransformation.matrix.applyScaling( scaling );
    this.viewTransformation.matrix.applyTranslation( translation );
  }
}
