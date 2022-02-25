import { Box2, Matrix3, Vector2 } from '@daign/math';

import { StyledGraphicNode } from '../styledGraphicNode';

/**
 * Class for a circle element defined by two points: the center and a point on the circle.
 */
export class TwoPointCircle extends StyledGraphicNode {
  public get center(): Vector2 {
    return this.points.getByName( 'center' );
  }

  public set center( position: Vector2 ) {
    this.points.getByName( 'center' ).copy( position );
  }

  public get circlePoint(): Vector2 {
    return this.points.getByName( 'circlePoint' );
  }

  public set circlePoint( position: Vector2 ) {
    this.points.getByName( 'circlePoint' ).copy( position );
  }

  /**
   * Constructor.
   */
  public constructor() {
    super();

    this.baseClass = 'circle';
    this.points.initializeElements( 2 );
    this.points.assignName( 'center', 0 );
    this.points.assignName( 'circlePoint', 1 );
  }

  /**
   * Calculate the radius after a given transformation.
   * @param transformation - The transformation to apply.
   * @returns The transformed radius.
   */
  public getRadiusTransformed( transformation: Matrix3 ): number {
    const centerPoint = this.center.clone().transform( transformation );
    const circlePoint = this.circlePoint.clone().transform( transformation );
    const radius = centerPoint.distanceTo( circlePoint );
    return radius;
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

  /**
   * Get the bounding box of the circle.
   * @returns The bounding box.
   */
  public getBox(): Box2 {
    const box = new Box2();
    const radius = this.center.distanceTo( this.circlePoint );
    box.expandByPoint( this.center );
    box.expandByScalar( radius );
    return box;
  }
}
