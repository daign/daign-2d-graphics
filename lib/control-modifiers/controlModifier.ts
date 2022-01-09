import { Vector2 } from '@daign/math';

import { ControlObject } from '../control-objects/controlObject';

/**
 * Abstract class for modifiers that restrict or modify the outcome of drawing actions.
 */
export abstract class ControlModifier {
  // Variable to temporarily disable the control modifier.
  public enabled: boolean = true;

  /**
   * Constructor.
   */
  protected constructor() {}

  /**
   * Modify the position change that has been requested for a control object.
   * This is the function that should implement the logic of the modifier.
   * A change that is made to one point can affect others too, so it is required to return the
   * whole array of points. Modifiers can be chained, that's why the points fed to a modifier have
   * to be taken from the passed points array, not from the original points in the passed control
   * object.
   * @param updatedPoints - The array of updated points.
   * @param pointIndex - The index of the point that initiated the change.
   * @param controlObject - The corresponding control object.
   * @returns The modified array of points.
   */
  public modifyPositions(
    updatedPoints: Vector2[],
    _pointIndex: number,
    _controlObject: ControlObject
  ): Vector2[] {
    return updatedPoints;
  }

  /**
   * Method that applies the modifyPositions method to the control object directly.
   * @param controlObject - The control object.
   * @param pointIndex - The index of the point that a change to is being made.
   * @param pointUpdatedPosition - The new position to apply to the point.
   */
  public executeModifier(
    controlObject: ControlObject,
    pointIndex: number,
    pointUpdatedPosition: Vector2
  ): void {
    if ( this.enabled ) {
      const updatedPoints = controlObject.points.cloneDeep().elements;
      updatedPoints[ pointIndex ].copy( pointUpdatedPosition );

      const modifiedPoints = this.modifyPositions( updatedPoints, pointIndex, controlObject );
      controlObject.points.elements = modifiedPoints;
    }
  }
}
