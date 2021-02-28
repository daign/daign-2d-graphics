import { expect } from 'chai';

import { Vector2 } from '@daign/math';

import { Application, Viewport, StyledGraphicNode } from '../../lib';
import { TestContext } from '../testContext';

class TestNode extends StyledGraphicNode {
  public constructor() {
    super();
  }
}

describe( 'Viewport', (): void => {
  describe( 'fitToContent', (): void => {
    it( 'should set the center of the content as the views center', (): void => {
      // Arrange
      const context = new TestContext();
      const application = new Application( context );
      const viewport = new Viewport( context, application );

      const content = new TestNode();
      content.points.elements = [
        new Vector2( 2, 3 ),
        new Vector2( 4, 5 )
      ];
      viewport.appendChild( content );

      // Act
      viewport.fitToContent( 2 );

      // Assert
      const expectedCenter = new Vector2( 3, 4 );
      expect( ( viewport as any ).viewCenter.equals( expectedCenter ) ).to.be.true;
    } );
  } );
} );
