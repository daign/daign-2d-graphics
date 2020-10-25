import { Matrix3, Vector2 } from '@daign/math';

import { StyledGraphicNode } from '../styledGraphicNode';

/**
 * Class for a text element at an anchor position.
 */
export class Text extends StyledGraphicNode {
  /**
   * Getter for the anchor position.
   */
  public get anchor(): Vector2 {
    return this.points.getByName( 'anchor' );
  }

  /**
   * Setter for the anchor position.
   */
  public set anchor( position: Vector2 ) {
    this.points.getByName( 'anchor' ).copy( position );
  }

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
    this.points.initializeElements( 1 );
    this.points.assignName( 'anchor', 0 );
  }

  /**
   * Calculate the anchor point after a given transformation.
   * @param transformation - The transformation to apply.
   * @returns The transformed anchor position.
   */
  public getAnchorTransformed( transformation: Matrix3 ): Vector2 {
    const anchorPoint = this.anchor.clone().transform( transformation );
    return anchorPoint;
  }
}
