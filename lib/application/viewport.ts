import { Box2, Value, Vector2 } from '@daign/math';
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
  public viewCenter: Vector2 = new Vector2();

  // Scaling of the viewport content.
  public viewScale: Value = new Value( 1 );

  // Minimum scale.
  public scaleMin: number = 0.001;

  // Maximum scale.
  public scaleMax: number = 1000;

  // Area limiting view center movements.
  public viewCenterLimit: Box2 = new Box2();

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

    // Initialize with unlimited view center limit.
    this.viewCenterLimit.makeUnlimited();

    // Add the transformations that transform the viewport.
    this.scaleTransform.scaling.set( 1, 1 );
    this.transformation.push( this.translateTransform );
    this.transformation.push( this.scaleTransform );
    this.transformation.push( this.decenteringTransform );

    // Automatically update viewport when center or scale changes.
    this.viewCenter.subscribeToChanges( (): void => {
      this.updateViewport();
    } );
    this.viewScale.subscribeToChanges( (): void => {
      this.updateViewport();
    } );
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
    // Scaling is the same in both directions.
    // Set silent so that updateViewport can be called once at the end.
    this.viewScale.setSilent( Math.min( scaling.x, scaling.y ) );

    const newCenter = contentBox.min.clone().add( contentBox.size.clone().multiplyScalar( 0.5 ) );
    this.viewCenter.copySilent( newCenter );

    this.updateViewport();
  }

  /**
   * Set view center and scale so that the coordinates translate one-to-one to context coordinates.
   */
  public fitToContextSize(): void {
    // Set center of target's drawing space as center.
    const newCenter = this.context.size.clone().multiplyScalar( 0.5 );
    this.viewCenter.copySilent( newCenter );
    this.viewScale.setSilent( 1 );

    this.updateViewport();
  }

  /**
   * Calculate and apply the transformations that result from the view center and scale properties.
   */
  protected updateViewport(): void {
    // Apply limits to center and scale.
    const limitedCenter = this.viewCenter.clone().clampInBox( this.viewCenterLimit );
    this.viewCenter.copySilent( limitedCenter );
    const limitedScale = this.viewScale.clone().clamp( this.scaleMin, this.scaleMax );
    this.viewScale.setSilent( limitedScale.x );

    // Move the center of the view to (0,0) to keep it unaffected from the scaling.
    const decentering = new Vector2( -this.viewCenter.x, -this.viewCenter.y );

    const scaling = new Vector2( this.viewScale.x, this.viewScale.x );
    const translation = this.context.size.clone().multiplyScalar( 0.5 );

    this.decenteringTransform.translation.copy( decentering );
    this.scaleTransform.scaling.copy( scaling );
    this.translateTransform.translation.copy( translation );
  }
}
