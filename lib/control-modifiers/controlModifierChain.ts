import { Vector2 } from '@daign/math';

import { ControlObject } from '../control-elements';

import { IControlModifier } from './iControlModifier';

/**
 * Abstract class for a chain of modifiers that restrict or modify the outcome of drawing actions.
 */
export class ControlModifierChain implements IControlModifier {
  // Variable to temporarily disable the control modifier.
  public enabled: boolean = true;

  // The array of control modifiers to apply one after the other.
  private modifiers: IControlModifier[] = [];

  /* Function that can cancel the execution of the modifier chain in certain cases. Replace this
   * function if needed and return false when execution should be canceled. */
  public selectorFunction: (
    updatedPoints: Vector2[],
    pointIndex: number,
    controlObject: ControlObject
  ) => boolean = () => true;

  /**
   * Constructor.
   */
  public constructor() {}

  /**
   * Method that applies the chain of modifiers to the point array.
   * @param updatedPoints - The array of updated points.
   * @param pointIndex - The index of the point that initiated the change.
   * @param controlObject - The corresponding control object.
   * @returns The modified array of points.
   */
  public modifyPoints(
    updatedPoints: Vector2[],
    pointIndex: number,
    controlObject: ControlObject
  ): Vector2[] {
    // Determine whether the modifier chain should be applied to the specified input.
    const doExecute = this.selectorFunction( updatedPoints, pointIndex, controlObject );

    // If execution is blocked than return the unmodified points.
    if ( !doExecute || !this.enabled ) {
      return updatedPoints;
    }

    // Array of modified points. Will be overwritten during each modifier execution.
    let modifiedPoints = updatedPoints;

    this.modifiers.forEach( ( modifier: IControlModifier ): void => {
      modifiedPoints = modifier.modifyPoints( modifiedPoints, pointIndex, controlObject );
    } );

    return modifiedPoints;
  }

  /**
   * Add a modifier to the chain of modifiers. Can also be another ModifierChain.
   * @param modifier - The modifier to add.
   */
  public addModifier( modifier: IControlModifier ): void {
    this.modifiers.push( modifier );
  }
}
