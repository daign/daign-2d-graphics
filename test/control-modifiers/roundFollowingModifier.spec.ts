import { expect } from 'chai';

import { Vector2 } from '@daign/math';

import { RoundFollowingModifier, ControlObject } from '../../lib';

class TestObject extends ControlObject {
  public constructor() {
    super();
  }
  public redraw(): void {}
}

describe( 'RoundFollowingModifier', (): void => {
  describe( 'constructor', (): void => {
    it( 'should set the precision', (): void => {
      // Act
      const modifier = new RoundFollowingModifier( 2 );

      // Assert
      expect( ( modifier as any ).precision ).to.equal( 2 );
    } );
  } );

  describe( 'modifyPoints', (): void => {
    it( 'should round the following vectors', (): void => {
      // Arrange
      const modifier = new RoundFollowingModifier();
      const updatedPoints = [
        new Vector2( 1.1, 2.5 ),
        new Vector2( 3.1, 4.5 ),
        new Vector2( 5.1, 6.5 ),
        new Vector2( 7.1, 8.5 )
      ];
      const index = 1;
      const controlObject = new TestObject();

      // Act
      const modifiedPoints = modifier.modifyPoints( updatedPoints, index, controlObject );

      // Assert
      expect( modifiedPoints[ 0 ].equals( new Vector2( 1.1, 2.5 ) ) ).to.be.true;
      expect( modifiedPoints[ 1 ].equals( new Vector2( 3.1, 4.5 ) ) ).to.be.true;
      expect( modifiedPoints[ 2 ].equals( new Vector2( 5, 7 ) ) ).to.be.true;
      expect( modifiedPoints[ 3 ].equals( new Vector2( 7, 9 ) ) ).to.be.true;
    } );

    it( 'should not modify vectors when disabled', (): void => {
      // Arrange
      const modifier = new RoundFollowingModifier();
      modifier.enabled = false;
      const updatedPoints = [
        new Vector2( 1.1, 2.5 ),
        new Vector2( 3.1, 4.5 ),
        new Vector2( 5.1, 6.5 ),
        new Vector2( 7.1, 8.5 )
      ];
      const index = 1;
      const controlObject = new TestObject();

      // Act
      const modifiedPoints = modifier.modifyPoints( updatedPoints, index, controlObject );

      // Assert
      expect( modifiedPoints[ 0 ].equals( new Vector2( 1.1, 2.5 ) ) ).to.be.true;
      expect( modifiedPoints[ 1 ].equals( new Vector2( 3.1, 4.5 ) ) ).to.be.true;
      expect( modifiedPoints[ 2 ].equals( new Vector2( 5.1, 6.5 ) ) ).to.be.true;
      expect( modifiedPoints[ 3 ].equals( new Vector2( 7.1, 8.5 ) ) ).to.be.true;
    } );

    it( 'should round with precision', (): void => {
      // Arrange
      const modifier = new RoundFollowingModifier( 2 );
      const updatedPoints = [
        new Vector2( 1.111, 5.555 ),
        new Vector2( 1.234, 2.345 )
      ];
      const index = 0;
      const controlObject = new TestObject();

      // Act
      const modifiedPoints = modifier.modifyPoints( updatedPoints, index, controlObject );

      // Assert
      expect( modifiedPoints[ 0 ].equals( new Vector2( 1.111, 5.555 ) ) ).to.be.true;
      expect( modifiedPoints[ 1 ].equals( new Vector2( 1.23, 2.35 ) ) ).to.be.true;
    } );

    it( 'should not round anything if index is out of range', (): void => {
      // Arrange
      const modifier = new RoundFollowingModifier();
      const updatedPoints = [
        new Vector2( 1.111, 5.555 ),
        new Vector2( 1.234, 2.345 )
      ];
      const index = 2;
      const controlObject = new TestObject();

      // Act
      const modifiedPoints = modifier.modifyPoints( updatedPoints, index, controlObject );

      // Assert
      expect( modifiedPoints[ 0 ].equals( new Vector2( 1.111, 5.555 ) ) ).to.be.true;
      expect( modifiedPoints[ 1 ].equals( new Vector2( 1.234, 2.345 ) ) ).to.be.true;
    } );

    it( 'should round everything if index is -1', (): void => {
      // Arrange
      const modifier = new RoundFollowingModifier();
      const updatedPoints = [
        new Vector2( 1.111, 5.555 ),
        new Vector2( 1.234, 2.345 )
      ];
      const index = -1;
      const controlObject = new TestObject();

      // Act
      const modifiedPoints = modifier.modifyPoints( updatedPoints, index, controlObject );

      // Assert
      expect( modifiedPoints[ 0 ].equals( new Vector2( 1, 6 ) ) ).to.be.true;
      expect( modifiedPoints[ 1 ].equals( new Vector2( 1, 2 ) ) ).to.be.true;
    } );
  } );
} );
