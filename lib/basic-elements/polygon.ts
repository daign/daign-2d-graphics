import { StyledGraphicNode } from '../styledGraphicNode';

/**
 * Class for a polygon element.
 */
export class Polygon extends StyledGraphicNode {
  /**
   * Constructor.
   */
  public constructor() {
    super();

    this.baseClass = 'polygon';
  }
}
