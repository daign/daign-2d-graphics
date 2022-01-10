import { ButtonObject } from '../application';
import { Group } from '../basic-elements';
import { IControlModifier } from '../control-modifiers';

/**
 * Abstract class for drawing elements that are defined by interactive control points.
 */
export abstract class ControlObject extends Group {
  // Modifiers that restrict drawing actions.
  public controlModifier: IControlModifier | null = null;

  // Array of button objects.
  public buttons: ButtonObject[] = [];

  /**
   * Constructor.
   */
  public constructor() {
    super();

    this.redraw();

    // Redraw method is automatically called when the points array changes.
    this.points.subscribeToChanges( (): void => {
      this.redraw();
    } );
  }

  /**
   * The redraw method to extend which should create the shape of the element.
   */
  public redraw(): void {
    this.clearChildren();
    this.buttons = [];
  };
}
