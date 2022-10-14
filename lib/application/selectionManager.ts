import { Observable } from '@daign/observable';
import { Vector2 } from '@daign/math';

import { ControlObject } from '../control-objects/controlObject';

/**
 * Class that manages the current selected control object and control point.
 */
export class SelectionManager extends Observable {
  // The currently active control object or null.
  public activeObject: ControlObject | null = null;

  // The currently active control point vector or null.
  public activePoint: Vector2 | null = null;

  /**
   * Constructor.
   */
  public constructor() {
    super();
  }

  /**
   * Set the current selection.
   * @param activeObject - The currently active control object or null.
   * @param activePoint - The currently active control point vector or null.
   */
  public setSelection(
    activeObject: ControlObject | null,
    activePoint: Vector2 | null
  ): void {
    // Setting a point without an object is not a valid option.
    if ( activeObject === null && activePoint !== null ) {
      return;
    }

    /* When setting an object and a point, the point must be part of the object's point elements.
     * Otherwise not a valid option. */
    if ( activeObject !== null && activePoint !== null ) {
      const points = activeObject.points.elements;
      if ( points.indexOf( activePoint ) === -1 ) {
        return;
      }
    }

    if ( this.activeObject !== activeObject || this.activePoint !== activePoint ) {
      this.activeObject = activeObject;
      this.activePoint = activePoint;
      this.notifyObservers();
    }
  }
}
