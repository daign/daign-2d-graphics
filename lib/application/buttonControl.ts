import { Matrix3 } from '@daign/math';
import { MatrixTransform } from '@daign/2d-pipeline';

import { ButtonObject } from './buttonObject';
import { Application } from './application';

import { FixedRadiusCircle, Group } from '../basic-elements';

/**
 * Interactive button control which displays a button object.
 */
export class ButtonControl extends Group {
  // The callback to call on click.
  private callback: () => void;

  // The corresponding application.
  private application: Application;

  /**
   * Constructor.
   * @param buttonObject - The button object to display.
   * @param targetTransformation - The transformation matrix of the control object.
   * @param application - The corresponding application.
   */
  public constructor(
    buttonObject: ButtonObject, targetTransformation: Matrix3, application: Application
  ) {
    super();

    this.application = application;

    this.callback = buttonObject.callback;

    /* The anchor position is used to calculate an offset transformation that gets applied to all
     * child elements of the button control group. */
    const center = buttonObject.anchor.clone().transform( targetTransformation );
    const offset = new MatrixTransform();
    offset.matrix.setTranslation( center );
    this.transformation.push( offset );

    this.baseClass = 'buttonControl';

    if ( buttonObject.buttonShape ) {
      this.appendChild( buttonObject.buttonShape );
    } else {
      // The default shape to display for a button control.
      // Center is (0,0) because the whole group is shifted into position.
      const defaultShape = new FixedRadiusCircle();
      defaultShape.radius = 15;
      this.appendChild( defaultShape );
    }
  }

  /**
   * Button click event.
   */
  public click(): void {
    this.callback();
    this.application.createControls();
    this.application.drawingLayer.redrawObservable.notify();
  }
}
