import { StyledGraphicNode } from '../styledGraphicNode';

/**
 * Class for a quadratic Bézier curve element.
 */
export class QuadraticCurve extends StyledGraphicNode {
  /**
   * Constructor.
   */
  public constructor() {
    super();

    this.baseClass = 'quadratic-curve';
  }
}
