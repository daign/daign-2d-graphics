import { Vector2 } from '@daign/math';

import { StyledGraphicNode } from '../styledGraphicNode';

import { ControlObject } from './controlObject';

/**
 * Interface for the implementation of control guides.
 */
export interface IControlGuide {
  /**
   * Create the shapes that make up the control guide.
   * @param activeObject - The currently active control object.
   * @param activePoint - The currently active control point vector or null.
   */
  redraw(
    activeObject: ControlObject,
    activePoint: Vector2 | null
  ): StyledGraphicNode;
}
