import { Vector2 } from '@daign/math';

import { ITargetContext } from '../lib';

/**
 * Implementation of ITargetContext for the tests.
 */
export class TestContext implements ITargetContext {
  public _size: Vector2 = new Vector2( 1, 1 );
  public domNode: any = null;

  /**
   * Returns the dimension of the target's drawing space.
   */
  public get size(): Vector2 {
    return this._size;
  }

  /**
   * Constructor.
   */
  public constructor() {}
}
