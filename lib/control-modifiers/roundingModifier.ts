import { Vector2 } from '@daign/math';

import { ControlObject } from '../control-elements';

import { IControlModifier } from './iControlModifier';

/**
 * Rounding modifier.
 * Round the point coordinates to the given precision.
 */
export class RoundingModifier implements IControlModifier {
  // Variable to temporarily disable the control modifier.
  public enabled: boolean = true;

  private precision: number | undefined  = undefined;

  /**
   * Constructor.
   * @param precision - The number of decimal places to round to. Optional.
   */
  public constructor( precision?: number ) {
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
  public modifyPoints(
    updatedPoints: Vector2[],
    pointIndex: number,
    _controlObject: ControlObject
  ): Vector2[] {
    if ( !this.enabled ) {
      return updatedPoints;
    }

    const targetPoint = updatedPoints[ pointIndex ];
    targetPoint.round( this.precision );
    return updatedPoints;
  }
}
