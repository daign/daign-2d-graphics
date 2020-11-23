import { Matrix3, Vector2 } from '@daign/math';

import { StyledGraphicNode } from '../styledGraphicNode';

/**
 * Abstract class for single point elements at an anchor position.
 */
export abstract class SinglePointElement extends StyledGraphicNode {
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

  /**
   * Constructor.
   */
  public constructor() {
    super();

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
