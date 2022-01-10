import { expect } from 'chai';

import { Vector2 } from '@daign/math';

import { RoundingModifier, ControlObject } from '../../lib';

class TestObject extends ControlObject {
  public constructor() {
    super();
    this.points.elements = [ new Vector2(), new Vector2() ];
  }
  public redraw(): void {}
}

describe( 'RoundingModifier', (): void => {
  describe( 'executeModifier', (): void => {
    it( 'should set rounded vectors to the control object', (): void => {
      // Arrange
      const modifier = new RoundingModifier();
      const controlObject = new TestObject();
      const index = 1;

      // Act
      modifier.executeModifier( controlObject, index, new Vector2( 1.3, 1.5 ) );

      // Assert
      expect( controlObject.points.elements[ index ].equals( new Vector2( 1, 2 ) ) ).to.be.true;
    } );
  } );
} );
