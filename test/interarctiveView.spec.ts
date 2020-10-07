import { expect } from 'chai';

import { Vector2 } from '@daign/math';

import { InteractiveView, StyledGraphicNode } from '../lib';
import { TestContext } from './testContext';

class TestNode extends StyledGraphicNode {
  public constructor() {
    super();
  }
}

describe( 'InteractiveView', (): void => {
  describe( 'fitToContent', (): void => {
    it( 'should set the center of the content as the views center', (): void => {
      // Arrange
      const context = new TestContext();
      const view = new InteractiveView( context );
      const content = new TestNode();
      content.points = [
        new Vector2( 2, 3 ),
        new Vector2( 4, 5 )
      ];
      view.mountNode( content );

      // Act
      view.fitToContent();

      // Assert
      const expectedCenter = new Vector2( 3, 4 );
      expect( ( view as any ).viewCenter.equals( expectedCenter ) ).to.be.true;
    } );
  } );
} );
