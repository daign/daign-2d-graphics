import { expect } from 'chai';

import { Vector2 } from '@daign/math';

import { OrthogonalModifier, ControlObject } from '../../lib';

class TestObject extends ControlObject {
  public constructor() {
    super();
  }
  public redraw(): void {}
}

describe( 'OrthogonalModifier', (): void => {
  describe( 'modifyPoints', (): void => {
    it( 'should align x-coordinate to previous vector', (): void => {
      // Arrange
      const modifier = new OrthogonalModifier();
      const updatedPoints = [
        new Vector2( 1, 2 ),
        new Vector2( 1.2, 4 )
      ];
      const index = 1;
      const controlObject = new TestObject();

      // Act
      const modifiedPoints = modifier.modifyPoints( updatedPoints, index, controlObject );

      // Assert
      expect( modifiedPoints[ 0 ].equals( new Vector2( 1, 2 ) ) ).to.be.true;
      expect( modifiedPoints[ 1 ].equals( new Vector2( 1, 4 ) ) ).to.be.true;
    } );

    it( 'should align y-coordinate if difference on x-axis is greater', (): void => {
      // Arrange
      const modifier = new OrthogonalModifier();
      const updatedPoints = [
        new Vector2( 1, 2 ),
        new Vector2( 5, 4 )
      ];
      const index = 1;
      const controlObject = new TestObject();

      // Act
      const modifiedPoints = modifier.modifyPoints( updatedPoints, index, controlObject );

      // Assert
      expect( modifiedPoints[ 0 ].equals( new Vector2( 1, 2 ) ) ).to.be.true;
      expect( modifiedPoints[ 1 ].equals( new Vector2( 5, 2 ) ) ).to.be.true;
    } );
  } );
} );
