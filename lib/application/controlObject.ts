import { Group } from '../basic-elements/group';

/**
 * Abstract class for drawing elements that are defined by interactive control points.
 */
export abstract class ControlObject extends Group {
  /**
   * The redraw method to implement which should create the shape of the element.
   */
  public abstract redraw(): void;

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
}
