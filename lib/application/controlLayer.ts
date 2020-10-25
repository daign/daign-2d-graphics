import { Vector2 } from '@daign/math';

import { Group } from '../basic-elements';
import { ControlObject } from './controlObject';
import { ControlPoint } from './controlPoint';
import { Application } from './application';

/**
 * Layer to host the control elements of selected control objects.
 */
export class ControlLayer extends Group {
  // The currently active control object or null.
  private activeElement: ControlObject | null = null;

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
   * Activate a control object.
   * @param controlObject - The control object to activate.
   */
  public activateElement( controlObject: ControlObject ): void {
    this.activeElement = controlObject;
    this.createControls();
  }

  /**
   * Deactivate the currently activated control object.
   */
  public deactivateElement(): void {
    this.activeElement = null;
    this.createControls();
  }

  /**
   * Create the control elements for the active control object.
   */
  public createControls(): void {
    this.clearChildren();
    if ( this.activeElement !== null ) {
      this.activeElement.points.iterate( ( point: Vector2 ): void => {
        // TODO Get the correct presentation node that corresponds to the application's view.
        const transformation = this.activeElement!.presentationNodes[ 0 ].projectNodeToView;

        const controlPoint = new ControlPoint( point, transformation, this.application,
          this.activeElement! );
        this.appendChild( controlPoint );
      } );
    }
  }
}
