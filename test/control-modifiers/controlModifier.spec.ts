import { expect } from 'chai';

import { Vector2 } from '@daign/math';

import { ControlModifier, ControlObject } from '../../lib';

class TestModifier extends ControlModifier {
  public constructor() {
    super();
  }

  public modifyPositions(
    updatedPoints: Vector2[],
    pointIndex: number,
    _controlObject: ControlObject
  ): Vector2[] {
    updatedPoints[ pointIndex ].set( 1, 2 );
    return updatedPoints;
  }
}

class TestObject extends ControlObject {
  public constructor() {
    super();
    this.points.elements = [ new Vector2(), new Vector2() ];
  }
  public redraw(): void {}
}

describe( 'ControlModifier', (): void => {
  describe( 'executeModifier', (): void => {
    it( 'should set vector at index 1 to the coordinates specified in the modifier', (): void => {
      // Arrange
      const modifier = new TestModifier();
      const controlObject = new TestObject();
      const index = 1;

      // Act
      modifier.executeModifier( controlObject, index, new Vector2( 3, 4 ) );

      // Assert
      expect( controlObject.points.elements[ index ].equals( new Vector2( 1, 2 ) ) ).to.be.true;
    } );

    it( 'should set the vector unmodified if the modifier is disabled', (): void => {
      // Arrange
      const modifier = new TestModifier();
      modifier.enabled = false;
      const controlObject = new TestObject();
      const index = 1;

      // Act
      modifier.executeModifier( controlObject, index, new Vector2( 3, 4 ) );

      // Assert
      expect( controlObject.points.elements[ index ].equals( new Vector2( 3, 4 ) ) ).to.be.true;
    } );
  } );
} );
