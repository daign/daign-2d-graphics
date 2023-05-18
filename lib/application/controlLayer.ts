import { Group } from '../basic-elements';

import { Application } from './application';

/**
 * Layer to host the control elements of selected control objects.
 */
export class ControlLayer extends Group {
  /**
   * Constructor.
   * @param application - The corresponding application.
   */
  public constructor(
    private application: Application
  ) {
    super();

    this.baseClass = 'control-layer';

    // Subscribe to the update manager to know when to redraw the controls.
    this.application.updateManager.setRedrawControlsFunction( (): void => {
      this.redrawControls();
    } )
  }

  /**
   * Create the control elements for the active control object.
   */
  private redrawControls(): void {
    this.clearChildren();

    const activeObject = this.application.selectionManager.activeObject;
    const activePoint = this.application.selectionManager.activePoint;

    if ( activeObject ) {
      const node = activeObject.redrawControlObjects( activePoint, this.application );
      this.appendChild( node );
    }
  }
}
