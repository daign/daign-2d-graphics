import { SinglePointElement } from '../basic-elements/singlePointElement';

/**
 * Class for a button object at an anchor position.
 */
export class ButtonObject extends SinglePointElement {
  // The callback for the button's action.
  public callback: () => void;

  /**
   * Constructor.
   */
  public constructor( callback: () => void ) {
    super();

    this.callback = callback;

    this.baseClass = 'button';
  }
}
