import { Vector2 } from '@daign/math';

import { StyledGraphicNode } from '../styledGraphicNode';

import { ControlObject } from './controlObject';

/**
 * Interface for the implementation of control guides.
 * Control guides are anything that should be rendered on the control layer but are not control
 * points or buttons.
 */
export interface IControlGuide {
  /**
   * Create the shapes that make up the control guide.
   * @param activeObject - The currently active control object.
   * @param activePoint - The currently active control point vector or null.
   * @returns The constructed node or null.
   */
  redraw(
    activeObject: ControlObject,
    activePoint: Vector2 | null
  ): StyledGraphicNode | null;
}
