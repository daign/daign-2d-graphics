import { Vector2 } from '@daign/math';

/**
 * Interface for the implementation of the target context.
 */
export interface ITargetContext {
  /**
   * The DOM node of the target context if present.
   */
  domNode: any;

  /**
   * Dimension of the target's drawing space.
   */
  size: Vector2;
}
