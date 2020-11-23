import { Matrix3 } from '@daign/math';

import { ButtonObject } from './buttonObject';
import { FixedRadiusCircle } from '../basic-elements/fixedRadiusCircle';
import { Application } from './application';

/**
 * Interactive button control which displays a button object.
 */
export class ButtonControl extends FixedRadiusCircle {
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
    this.radius = 15;

    this.application = application;

    this.callback = buttonObject.callback;
    this.center = buttonObject.anchor.clone().transform( targetTransformation );

    this.baseClass = 'buttonControl';
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
