import { Vector2 } from '@daign/math';

import { ControlObject } from '../control-objects';

import { ControlModifier } from './controlModifier';

/**
 * Round following modifier.
 * Round the points that follow the point of the original change request.
 */
export class RoundFollowingModifier extends ControlModifier {
  private precision: number | undefined  = undefined;

  /**
   * Constructor.
   * @param precision - The number of decimal places to round to. Optional.
   */
  public constructor( precision?: number ) {
    super();

    if ( precision ) {
      this.precision = precision;
    }
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
    // Apply the same difference to all following points.
    const modifiedPoints = updatedPoints.map( ( point: Vector2, index: number ): Vector2 => {
      if ( index > pointIndex ) {
        point.round( this.precision );
      }
      return point;
    } );

    return modifiedPoints;
  }
}
