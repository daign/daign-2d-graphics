import { Vector2 } from '@daign/math';

import { ControlObject } from '../control-objects';

import { ControlModifier } from './controlModifier';

/**
 * Orthogonal modifier.
 * The point has to be orthogonal to the previous point.
 */
export class OrthogonalModifier extends ControlModifier {
  /**
   * Constructor.
   */
  public constructor() {
    super();
  }

  /**
   * Modify the position change that has been requested for a control object.
   * @param updatedPoints - The array of updated points.
   * @param pointIndex - The index of the point that initiated the change.
   * @param controlObject - The corresponding control object.
   * @returns The modified array of points.
   */
  public modifyPositions(
    updatedPoints: Vector2[],
    pointIndex: number,
    _controlObject: ControlObject
  ): Vector2[] {
    // The first point can move freely. No change necessary.
    if ( pointIndex === 0 ) {
      return updatedPoints;
    } else {
      const targetPoint = updatedPoints[ pointIndex ];
      const previousPoint = updatedPoints[ pointIndex - 1 ];

      const diffHorizontal = Math.abs( targetPoint.x - previousPoint.x );
      const diffVertical = Math.abs( targetPoint.y - previousPoint.y );

      if ( diffHorizontal > diffVertical ) {
        targetPoint.set( targetPoint.x, previousPoint.y );
      } else {
        targetPoint.set( previousPoint.x, targetPoint.y );
      }

      return updatedPoints;
    }
  }
}
