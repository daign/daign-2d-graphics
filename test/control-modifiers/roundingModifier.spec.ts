import { expect } from 'chai';

import { Vector2 } from '@daign/math';

import { RoundingModifier, ControlObject } from '../../lib';

class TestObject extends ControlObject {
  public constructor() {
    super();
  }
  public redraw(): void {}
}

describe( 'RoundingModifier', (): void => {
  describe( 'modifyPoints', (): void => {
    it( 'should set rounded vectors to the control object', (): void => {
      // Arrange
      const modifier = new RoundingModifier();
      const updatedPoints = [ new Vector2( 1.3, 1.5 ) ];
      const index = 0;
      const controlObject = new TestObject();

      // Act
      const modifiedPoints = modifier.modifyPoints( updatedPoints, index, controlObject );

      // Assert
      expect( modifiedPoints[ index ].equals( new Vector2( 1, 2 ) ) ).to.be.true;
    } );
  } );
} );
