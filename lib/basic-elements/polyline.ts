import { StyledGraphicNode } from '../styledGraphicNode';

/**
 * Class for a polyline element.
 */
export class Polyline extends StyledGraphicNode {
  /**
   * Constructor.
   */
  public constructor() {
    super();

    this.baseClass = 'polyline';
  }
}
