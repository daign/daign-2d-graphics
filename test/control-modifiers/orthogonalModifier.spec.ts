import { expect } from 'chai';

import { Vector2 } from '@daign/math';

import { OrthogonalModifier, ControlObject } from '../../lib';

class TestObject extends ControlObject {
  public constructor() {
    super();
    this.points.elements = [
      new Vector2( 1, 2 ),
      new Vector2( 1, 3 )
    ];
  }
  public redraw(): void {}
}

describe( 'OrthogonalModifier', (): void => {
  describe( 'executeModifier', (): void => {
    it( 'should align x-coordinate to previous vector', (): void => {
      // Arrange
      const modifier = new OrthogonalModifier();
      const controlObject = new TestObject();
      const index = 1;

      // Act
      modifier.executeModifier( controlObject, index, new Vector2( 1.2, 4 ) );

      // Assert
      const points = controlObject.points.elements;
      expect( points[ 0 ].equals( new Vector2( 1, 2 ) ) ).to.be.true;
      expect( points[ 1 ].equals( new Vector2( 1, 4 ) ) ).to.be.true;
    } );

    it( 'should align y-coordinate if difference on x-axis is greater', (): void => {
      // Arrange
      const modifier = new OrthogonalModifier();
      const controlObject = new TestObject();
      const index = 1;

      // Act
      modifier.executeModifier( controlObject, index, new Vector2( 5, 4 ) );

      // Assert
      const points = controlObject.points.elements;
      expect( points[ 0 ].equals( new Vector2( 1, 2 ) ) ).to.be.true;
      expect( points[ 1 ].equals( new Vector2( 5, 2 ) ) ).to.be.true;
    } );
  } );
} );
