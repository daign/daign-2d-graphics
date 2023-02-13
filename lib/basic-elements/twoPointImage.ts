import { TwoPointRectangle } from './twoPointRectangle';

/**
 * Class for an image defined by two corner points.
 */
export class TwoPointImage extends TwoPointRectangle {
  // The href attribute content.
  public href: string = '';

  /**
   * Constructor.
   */
  public constructor() {
    super();

    this.baseClass = 'image';
  }
}
