import { expect } from 'chai';

import { Vector2 } from '@daign/math';

import { ControlModifierChain, OrthogonalModifier, RoundingModifier, ControlObject } from '../../lib';

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

describe( 'ControlModifierChain', (): void => {
  describe( 'executeModifier', (): void => {
    it( 'should apply both modifiers', (): void => {
      // Arrange
      const modifierChain = new ControlModifierChain();
      modifierChain.addModifier( new OrthogonalModifier() );
      modifierChain.addModifier( new RoundingModifier() );
      const controlObject = new TestObject();
      const index = 1;

      // Act
      modifierChain.executeModifier( controlObject, index, new Vector2( 1.2, 4.2 ) );

      // Assert
      const points = controlObject.points.elements;
      expect( points[ 0 ].equals( new Vector2( 1, 2 ) ) ).to.be.true;
      expect( points[ 1 ].equals( new Vector2( 1, 4 ) ) ).to.be.true;
    } );
  } );
} );
