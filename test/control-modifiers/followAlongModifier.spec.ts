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
  describe( 'executeModifier', (): void => {
    it( 'should apply the difference to the following vectors also', (): void => {
      // Arrange
      const modifier = new FollowAlongModifier();
      const controlObject = new TestObject();
      const index = 1;

      // Act
      modifier.executeModifier( controlObject, index, new Vector2( 5, 7 ) );

      // Assert
      const points = controlObject.points.elements;
      expect( points[ 0 ].equals( new Vector2( 1, 2 ) ) ).to.be.true;
      expect( points[ 1 ].equals( new Vector2( 5, 7 ) ) ).to.be.true;
      expect( points[ 2 ].equals( new Vector2( 7, 9 ) ) ).to.be.true;
      expect( points[ 3 ].equals( new Vector2( 9, 11 ) ) ).to.be.true;
    } );
  } );
} );
