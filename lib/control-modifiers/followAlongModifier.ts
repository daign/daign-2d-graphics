import { Vector2 } from '@daign/math';

import { ControlObject } from '../control-objects';

import { ControlModifier } from './controlModifier';

/**
 * Follow along modifier.
 * The movement of the specified point is applied to all following points also.
 */
export class FollowAlongModifier extends ControlModifier {
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
    controlObject: ControlObject
  ): Vector2[] {
    const pointBefore = controlObject.points.getElement( pointIndex );
    const pointAfter = updatedPoints[ pointIndex ];

    if ( pointBefore ) {
      // Difference between old and new position.
      const diff = pointBefore.clone().sub( pointAfter );

      // Apply the same difference to all following points.
      const modifiedPoints = updatedPoints.map( ( point: Vector2, index: number ): Vector2 => {
        if ( index > pointIndex ) {
          point.add( diff );
        }
        return point;
      } );

      return modifiedPoints;
    }

    return updatedPoints;
  }
}
