import { Matrix3, Vector2 } from '@daign/math';

import { StyledGraphicNode } from '../styledGraphicNode';

/**
 * Class for a circle element defined by two points.
 */
export class TwoPointCircle extends StyledGraphicNode {
  /**
   * Getter for the center position.
   */
  public get center(): Vector2 {
    return this._points[ 0 ];
  }

  /**
   * Setter for the center position.
   */
  public set center( position: Vector2 ) {
    this._points[ 0 ].copy( position );
  }

  /**
   * Getter for the position of a point on the circle.
   */
  public get circlePoint(): Vector2 {
    return this._points[ 1 ];
  }

  /**
   * Setter for the position of a point on the circle.
   */
  public set circlePoint( position: Vector2 ) {
    this._points[ 1 ].copy( position );
  }

  /**
   * Constructor.
   */
  public constructor() {
    super();

    this.baseClass = 'circle';
    this.createPoints( 2 );
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
}
