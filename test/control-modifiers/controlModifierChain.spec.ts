import { expect } from 'chai';

import { Vector2 } from '@daign/math';

import { ControlModifierChain, OrthogonalModifier, RoundingModifier, ControlObject } from '../../lib';

class TestObject extends ControlObject {
  public constructor() {
    super();
  }
  public redraw(): void {}
}

describe( 'ControlModifierChain', (): void => {
  describe( 'modifyPoints', (): void => {
    it( 'should apply both modifiers', (): void => {
      // Arrange
      const modifierChain = new ControlModifierChain();
      modifierChain.addModifier( new OrthogonalModifier() );
      modifierChain.addModifier( new RoundingModifier() );
      const updatedPoints = [
        new Vector2( 1, 2 ),
        new Vector2( 1.2, 4.2 )
      ];
      const index = 1;
      const controlObject = new TestObject();

      // Act
      const modifidPoints = modifierChain.modifyPoints( updatedPoints, index, controlObject );

      // Assert
      expect( modifidPoints[ 0 ].equals( new Vector2( 1, 2 ) ) ).to.be.true;
      expect( modifidPoints[ 1 ].equals( new Vector2( 1, 4 ) ) ).to.be.true;
    } );
  } );
} );
