import { SinglePointElement } from './singlePointElement';

/**
 * Class for a use element positioned at an anchor point.
 */
export class UseElement extends SinglePointElement {
  // The href attribute content.
  public href: string = '';

  /**
   * Constructor.
   */
  public constructor() {
    super();

    this.baseClass = 'use';
  }
}
