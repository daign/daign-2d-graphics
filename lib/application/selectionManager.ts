import { Observable } from '@daign/observable';

import { ControlObject } from '../control-objects/controlObject';

/**
 * Class that manages the current selected control object and control point.
 */
export class SelectionManager extends Observable {
  // The currently active control object or null.
  public activeObject: ControlObject | null = null;

  // The index of the currently active control point or null.
  public activePointIndex: number | null = null;

  /**
   * Constructor.
   */
  public constructor() {
    super();
  }

  /**
   * Set the current selection.
   * @param activeObject - The currently active control object or null.
   * @param activePointIndex - The index of the currently active control point or null.
   */
  public setSelection(
    activeObject: ControlObject | null,
    activePointIndex: number | null
  ): void {
    // Setting a point index without an object is not a valid option.
    if ( activeObject === null && activePointIndex !== null ) {
      return;
    }

    /* When setting an object and a point index, the point index must be within the bounds of the
     * object's point elements. Otherwise not a valid option. */
    if ( activeObject !== null && activePointIndex !== null ) {
      const numberOfPoints = activeObject.points.length;
      if ( numberOfPoints <= activePointIndex ) {
        return;
      }
    }

    if ( this.activeObject !== activeObject || this.activePointIndex !== activePointIndex ) {
      this.activeObject = activeObject;
      this.activePointIndex = activePointIndex;
      this.notifyObservers();
    }
  }
}
