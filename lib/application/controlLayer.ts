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
  }

  /**
   * Create the control elements for the active control object.
   */
  public createControls(): void {
    this.clearChildren();

    const activeObject = this.application.selectionManager.activeObject;
    const activePoint = this.application.selectionManager.activePoint;

    if ( activeObject ) {
      const node = activeObject.redrawControlObjects( activePoint, this.application );
      this.appendChild( node );
    }
  }
}
