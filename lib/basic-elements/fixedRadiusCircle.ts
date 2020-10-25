import { Matrix3, Vector2 } from '@daign/math';

import { StyledGraphicNode } from '../styledGraphicNode';

/**
 * Class for a circle element defined by center point and fixed radius.
 */
export class FixedRadiusCircle extends StyledGraphicNode {
  public radius: number = 1;

  /**
   * Getter for the center position.
   */
  public get center(): Vector2 {
    return this.points.getByName( 'center' );
  }

  /**
   * Setter for the center position.
   */
  public set center( position: Vector2 ) {
    this.points.getByName( 'center' ).copy( position );
  }

  /**
   * Constructor.
   */
  public constructor() {
    super();

    this.baseClass = 'circle';
    this.points.initializeElements( 1 );
    this.points.assignName( 'center', 0 )
  }

  /**
   * Calculate the center after a given transformation.
   * @param transformation - The transformation to apply.
   * @returns The transformed center position.
   */
  public getCenterTransformed( transformation: Matrix3 ): Vector2 {
    const centerPoint = this.center.clone().transform( transformation );
    return centerPoint;
  }
}
