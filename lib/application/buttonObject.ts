import { StyledGraphicNode } from '../styledGraphicNode';
import { SinglePointElement } from '../basic-elements';

/**
 * Class for a button object at an anchor position.
 */
export class ButtonObject extends SinglePointElement {
  // The callback for the button's action.
  public callback: () => void;

  // Button shape to display.
  public buttonShape: StyledGraphicNode | undefined;

  /**
   * Constructor.
   */
  public constructor( callback: () => void ) {
    super();

    this.callback = callback;

    this.baseClass = 'button';
  }
}
