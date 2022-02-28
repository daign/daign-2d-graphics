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
  describe( 'constructor', (): void => {
    it( 'should set the view center to the center of the drawing context', (): void => {
      // Arrange
      const context = new TestContext();
      context._size.set( 12, 14 );
      const application = new Application( context );

      // Act
      const viewport = new Viewport( context, application );

      // Assert
      const expectedCenter = new Vector2( 6, 7 );
      expect( ( viewport as any ).viewCenter.equals( expectedCenter ) ).to.be.true;
    } );
  } );

  describe( 'fitToContent', (): void => {
    it( 'should set the center of the content as the views center', (): void => {
      // Arrange
      const context = new TestContext();
      context._size.set( 4, 4 );
      const application = new Application( context );
      const viewport = new Viewport( context, application );

      const content = new TestNode();
      content.points.elements = [
        new Vector2( 2, 3 ),
        new Vector2( 4, 5 )
      ];
      viewport.appendChild( content );

      // Act
      viewport.fitToContent();

      // Assert
      const expectedCenter = new Vector2( 3, 4 );
      expect( ( viewport as any ).viewCenter.equals( expectedCenter ) ).to.be.true;
      expect( ( viewport as any ).viewScale ).to.equal( 2 );
    } );

    it( 'should set center and scale with margin around content', (): void => {
      // Arrange
      const context = new TestContext();
      context._size.set( 6, 6 );
      const application = new Application( context );
      const viewport = new Viewport( context, application );

      const content = new TestNode();
      content.points.elements = [
        new Vector2( 2, 3 ),
        new Vector2( 4, 5 )
      ];
      viewport.appendChild( content );
      const margin = 2;

      // Act
      viewport.fitToContent( margin );

      // Assert
      const expectedCenter = new Vector2( 3, 4 );
      expect( ( viewport as any ).viewCenter.equals( expectedCenter ) ).to.be.true;
      expect( ( viewport as any ).viewScale ).to.equal( 1 );
    } );
  } );
} );
