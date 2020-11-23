import { Handle } from '@daign/handle';
import { Vector2 } from '@daign/math';

import { ITargetContext } from '../iTargetContext';
import { Application } from './application';
import { Viewport } from './viewport';

/**
 * Group that acts as an interactive viewport by applying a transformation from user input.
 */
export class InteractiveViewport extends Viewport {
  /**
   * Constructor.
   * @param context - The target context.
   * @param application - The corresponding application.
   */
  public constructor( context: ITargetContext, application: Application ) {
    super( context, application );

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
        this.application.createControls();
        this.redrawObservable.notify();
      };

      handle.clicked = (): void => {
        this.application.deactivateElement();
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
        this.application.createControls();
        this.redrawObservable.notify();

        event.preventDefault();
        event.stopPropagation();
        return false;
      };
      context.domNode.addEventListener( 'wheel', onMouseWheel, false );
    }
  }
}
