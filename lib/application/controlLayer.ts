import { Vector2 } from '@daign/math';

import { Group } from '../basic-elements';

import { ButtonControl } from './buttonControl';
import { ButtonObject } from './buttonObject';
import { ControlPoint } from './controlPoint';
import { Application } from './application';

/**
 * Layer to host the control elements of selected control objects.
 */
export class ControlLayer extends Group {
  // The corresponding application.
  private application: Application;

  /**
   * Constructor.
   * @param application - The corresponding application.
   */
  public constructor( application: Application ) {
    super();

    this.application = application;
    this.baseClass = 'control-layer';
  }

  /**
   * Create the control elements for the active control object.
   */
  public createControls(): void {
    this.clearChildren();

    const activeObject = this.application.selectionManager.activeObject;
    const activePointIndex = this.application.selectionManager.activePointIndex;

    if ( !activeObject ) {
      return;
    }

    // TODO Get the correct presentation node that corresponds to the application's view.
    const transformation = activeObject.presentationNodes[ 0 ].projectNodeToView;

    activeObject.points.iterate( ( point: Vector2, index: number ): void => {
      const controlPoint = new ControlPoint( point, transformation, this.application, activeObject,
        index );
      this.appendChild( controlPoint );

      if ( index === activePointIndex ) {
        controlPoint.addClass( 'active' );
      }
    } );

    activeObject.buttons.forEach( ( button: ButtonObject ): void => {
      const buttonControl = new ButtonControl( button, transformation, this.application );
      this.appendChild( buttonControl );
    } )
  }
}
