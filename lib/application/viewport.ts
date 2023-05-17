import { Vector2 } from '@daign/math';
import { NativeScaleTransform, NativeTranslateTransform } from '@daign/2d-pipeline';

import { Group } from '../basic-elements/group';
import { ITargetContext } from '../iTargetContext';

import { Application } from './application';

/**
 * Group that acts as an viewport by applying a transformation to bring objects into the visible
 * area.
 * So this is just the top most node of the drawing layer. But the transformation it has is used
 * for zooming and panning the content around.
 */
export class Viewport extends Group {
  // The transformations applied to the view's content.
  private decenteringTransform: NativeTranslateTransform = new NativeTranslateTransform();
  private scaleTransform: NativeScaleTransform = new NativeScaleTransform();
  private translateTransform: NativeTranslateTransform = new NativeTranslateTransform();

  // Content coordinates at the center of the viewport.
  protected viewCenter: Vector2 = new Vector2();

  // Scaling of the viewport content.
  protected viewScale: number = 1;

  /**
   * Constructor.
   * @param context - The target drawing context.
   * @param application - The corresponding application.
   */
  public constructor(
    protected context: ITargetContext,
    protected application: Application
  ) {
    super();

    this.context = context;
    this.application = application;

    // Set center of target's drawing space as center.
    this.viewCenter.copy( context.size ).multiplyScalar( 0.5 );

    // Add the transformations that transform the viewport.
    this.scaleTransform.scaling.set( 1, 1 );
    this.transformation.push( this.translateTransform );
    this.transformation.push( this.scaleTransform );
    this.transformation.push( this.decenteringTransform );
  }

  /**
   * Set view center and scale so that the content is fully zoomed in the center of the viewport.
   * @param margin - The margin to leave around the content. Optional.
   */
  public fitToContent( margin?: number ): void {
    const contentBox = this.getBox();
    // Expand area of interest by margin.
    if ( margin ) {
      contentBox.expandByScalar( margin );
    }

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

    this.decenteringTransform.translation.copy( decentering );
    this.scaleTransform.scaling.copy( scaling );
    this.translateTransform.translation.copy( translation );

    this.application.updateManager.redrawSignal.emit();
  }
}
