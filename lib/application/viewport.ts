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
 * Group that acts as an viewport by applying a transformation to bring objects into the visible
 * area.
 */
export class Viewport extends Group {
  // The target drawing context.
  private context: ITargetContext;

  // The corresponding application.
  protected application: Application;

  // The transformation applied to the view's content.
  private viewTransformation: MatrixTransform = new MatrixTransform();

  // Content coordinates at the center of the viewport.
  protected viewCenter: Vector2 = new Vector2();

  // Scaling of the viewport content.
  protected viewScale: number = 1;

  // Observable to signal redraw execution.
  public redrawObservable: ObservableObject = new ObservableObject();

  /**
   * Constructor.
   * @param context - The target context.
   * @param application - The corresponding application.
   */
  public constructor( context: ITargetContext, application: Application ) {
    super();

    this.context = context;
    this.application = application;

    // Set center of target's drawing space as center.
    this.viewCenter.copy( context.size ).multiplyScalar( 0.5 );

    this.transformation.push( this.viewTransformation );
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
  protected updateViewport(): void {
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
