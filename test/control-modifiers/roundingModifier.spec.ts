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
  describe( 'constructor', (): void => {
    it( 'should set the precision', (): void => {
      // Act
      const modifier = new RoundingModifier( 2 );

      // Assert
      expect( ( modifier as any ).precision ).to.equal( 2 );
    } );
  } );

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

    it( 'should round with precision', (): void => {
      // Arrange
      const modifier = new RoundingModifier( 2 );
      const updatedPoints = [ new Vector2( 1.234, 2.345 ) ];
      const index = 0;
      const controlObject = new TestObject();

      // Act
      const modifiedPoints = modifier.modifyPoints( updatedPoints, index, controlObject );

      // Assert
      expect( modifiedPoints[ index ].equals( new Vector2( 1.23, 2.35 ) ) ).to.be.true;
    } );

    it( 'should not modify points when disabled', (): void => {
      // Arrange
      const modifier = new RoundingModifier();
      modifier.enabled = false;
      const updatedPoints = [ new Vector2( 1.3, 1.5 ) ];
      const index = 0;
      const controlObject = new TestObject();

      // Act
      const modifiedPoints = modifier.modifyPoints( updatedPoints, index, controlObject );

      // Assert
      expect( modifiedPoints[ index ].equals( new Vector2( 1.3, 1.5 ) ) ).to.be.true;
    } );
  } );
} );
