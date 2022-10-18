import { Vector2 } from '@daign/math';

import { ControlObject } from '../control-elements';

/**
 * Interface for modifiers that restrict or modify the outcome of drawing actions.
 */
export interface IControlModifier {
  // Variable to temporarily disable the control modifier.
  enabled: boolean;

  /**
   * Modify the position change that has been requested for a control object.
   * A change that is made to one point can affect others too, so it is required to return the
   * whole array of points. Modifiers can be chained, that's why the points fed to a modifier have
   * to be taken from the passed points array, not from the original points in the passed control
   * object.
   * @param updatedPoints - The array of updated points.
   * @param pointIndex - The index of the point that initiated the change.
   * @param controlObject - The corresponding control object.
   * @returns The modified array of points.
   */
  modifyPoints(
    updatedPoints: Vector2[],
    pointIndex: number,
    controlObject: ControlObject
  ): Vector2[];
}
