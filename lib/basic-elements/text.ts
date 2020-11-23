import { SinglePointElement } from './singlePointElement';

/**
 * Class for a text element at an anchor position.
 */
export class Text extends SinglePointElement {
  // The text content of the text element.
  public content: string = '';

  // The attribute defining the alignment of the text relative to its anchor.
  public textAnchor: string = 'end';

  /**
   * Constructor.
   */
  public constructor() {
    super();

    this.baseClass = 'text';
  }
}
