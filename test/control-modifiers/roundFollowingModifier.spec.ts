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
  describe( 'executeModifier', (): void => {
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
  } );
} );
