import { expect } from 'chai';

import { Vector2 } from '@daign/math';

import { RoundFollowingModifier, ControlObject } from '../../lib';

class TestObject extends ControlObject {
  public constructor() {
    super();
    this.points.elements = [
      new Vector2( 1.1, 2.5 ),
      new Vector2( 3.1, 4.5 ),
      new Vector2( 5.1, 6.5 ),
      new Vector2( 7.1, 8.5 )
    ];
  }
  public redraw(): void {}
}

describe( 'RoundFollowingModifier', (): void => {
  describe( 'executeModifier', (): void => {
    it( 'should round the following vectors', (): void => {
      // Arrange
      const modifier = new RoundFollowingModifier();
      const controlObject = new TestObject();
      const index = 1;

      // Act
      modifier.executeModifier( controlObject, index, new Vector2( 3.1, 4.5 ) );

      // Assert
      const points = controlObject.points.elements;
      expect( points[ 0 ].equals( new Vector2( 1.1, 2.5 ) ) ).to.be.true;
      expect( points[ 1 ].equals( new Vector2( 3.1, 4.5 ) ) ).to.be.true;
      expect( points[ 2 ].equals( new Vector2( 5, 7 ) ) ).to.be.true;
      expect( points[ 3 ].equals( new Vector2( 7, 9 ) ) ).to.be.true;
    } );
  } );
} );
