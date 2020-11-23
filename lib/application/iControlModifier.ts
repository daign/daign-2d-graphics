import { Vector2 } from '@daign/math';

import { ControlObject } from './controlObject';

/**
 * Interface for modifiers that restrict or modify the outcome of drawing actions.
 */
export interface IControlModifier {
  /**
   * Apply a position change of a control point to the control object.
   * @param controlObject - The control object to change.
   * @param pointIndex - The index of the point to change.
   * @param newPosition - The new position to apply to the point.
   */
  applyPosition(
    controlObject: ControlObject,
    pointIndex: number,
    newPosition: Vector2
  ): void;
}
