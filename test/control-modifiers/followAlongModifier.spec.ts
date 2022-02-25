import { expect } from 'chai';

import { Vector2 } from '@daign/math';

import { FollowAlongModifier, ControlObject } from '../../lib';

class TestObject extends ControlObject {
  public constructor() {
    super();
    this.points.elements = [
      new Vector2( 1, 2 ),
      new Vector2( 3, 4 ),
      new Vector2( 5, 6 ),
      new Vector2( 7, 8 )
    ];
  }
  public redraw(): void {}
}

describe( 'FollowAlongModifier', (): void => {
  describe( 'modifyPoints', (): void => {
    it( 'should apply the difference to the following vectors also', (): void => {
      // Arrange
      const modifier = new FollowAlongModifier();
      const updatedPoints = [
        new Vector2( 1, 2 ),
        new Vector2( 5, 7 ),
        new Vector2( 5, 6 ),
        new Vector2( 7, 8 )
      ];
      const index = 1;
      const controlObject = new TestObject();

      // Act
      const modifiedPoints = modifier.modifyPoints( updatedPoints, index, controlObject );

      // Assert
      expect( modifiedPoints[ 0 ].equals( new Vector2( 1, 2 ) ) ).to.be.true;
      expect( modifiedPoints[ 1 ].equals( new Vector2( 5, 7 ) ) ).to.be.true;
      expect( modifiedPoints[ 2 ].equals( new Vector2( 7, 9 ) ) ).to.be.true;
      expect( modifiedPoints[ 3 ].equals( new Vector2( 9, 11 ) ) ).to.be.true;
    } );

    it( 'should not modfify vectors when disabled', (): void => {
      // Arrange
      const modifier = new FollowAlongModifier();
      modifier.enabled = false;
      const updatedPoints = [
        new Vector2( 1, 2 ),
        new Vector2( 5, 7 ),
        new Vector2( 5, 6 ),
        new Vector2( 7, 8 )
      ];
      const index = 1;
      const controlObject = new TestObject();

      // Act
      const modifiedPoints = modifier.modifyPoints( updatedPoints, index, controlObject );

      // Assert
      expect( modifiedPoints[ 0 ].equals( new Vector2( 1, 2 ) ) ).to.be.true;
      expect( modifiedPoints[ 1 ].equals( new Vector2( 5, 7 ) ) ).to.be.true;
      expect( modifiedPoints[ 2 ].equals( new Vector2( 5, 6 ) ) ).to.be.true;
      expect( modifiedPoints[ 3 ].equals( new Vector2( 7, 8 ) ) ).to.be.true;
    } );

    it( 'should not modfify vectors when index is out of range', (): void => {
      // Arrange
      const modifier = new FollowAlongModifier();
      const updatedPoints = [
        new Vector2( 1, 2 ),
        new Vector2( 5, 7 ),
        new Vector2( 5, 6 ),
        new Vector2( 7, 8 )
      ];
      const index = 4;
      const controlObject = new TestObject();

      // Act
      const modifiedPoints = modifier.modifyPoints( updatedPoints, index, controlObject );

      // Assert
      expect( modifiedPoints[ 0 ].equals( new Vector2( 1, 2 ) ) ).to.be.true;
      expect( modifiedPoints[ 1 ].equals( new Vector2( 5, 7 ) ) ).to.be.true;
      expect( modifiedPoints[ 2 ].equals( new Vector2( 5, 6 ) ) ).to.be.true;
      expect( modifiedPoints[ 3 ].equals( new Vector2( 7, 8 ) ) ).to.be.true;
    } );
  } );
} );
