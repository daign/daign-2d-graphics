import { expect } from 'chai';
import { spy } from 'sinon';

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
    it( 'should add three transformations', (): void => {
      // Arrange
      const context = new TestContext();
      context._size.set( 12, 14 );
      const application = new Application( context );

      // Act
      const viewport = new Viewport( context, application );

      // Assert
      expect( viewport.transformation.length ).to.equal( 3 );
    } );

    it( 'should call updateViewport when view center changes', (): void => {
      // Arrange
      const context = new TestContext();
      context._size.set( 12, 14 );
      const application = new Application( context );
      const viewport = new Viewport( context, application );

      // Act
      const updateViewportSpy = spy( ( viewport as any ), 'updateViewport' );
      viewport.viewCenter.set( 1, 2 );

      // Assert
      expect( updateViewportSpy.calledOnce ).to.be.true;
    } );

    it( 'should call updateViewport when view scale changes', (): void => {
      // Arrange
      const context = new TestContext();
      context._size.set( 12, 14 );
      const application = new Application( context );
      const viewport = new Viewport( context, application );

      // Act
      const updateViewportSpy = spy( ( viewport as any ), 'updateViewport' );
      viewport.viewScale.x = 4;

      // Assert
      expect( updateViewportSpy.calledOnce ).to.be.true;
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
      expect( viewport.viewCenter.equals( expectedCenter ) ).to.be.true;
      expect( viewport.viewScale.x ).to.equal( 2 );
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
      expect( viewport.viewCenter.equals( expectedCenter ) ).to.be.true;
      expect( viewport.viewScale.x ).to.equal( 1 );
    } );
  } );

  describe( 'fitToContextSize', (): void => {
    it( 'should set scale and center one-to-one to context', (): void => {
      // Arrange
      const context = new TestContext();
      context._size.set( 5, 6 );
      const application = new Application( context );
      const viewport = new Viewport( context, application );

      // Act
      viewport.fitToContextSize();

      // Assert
      const expectedCenter = new Vector2( 2.5, 3 );
      expect( viewport.viewCenter.closeTo( expectedCenter ) ).to.be.true;
      expect( viewport.viewScale.x ).to.equal( 1 );
    } );
  } );

  describe( 'updateViewport', (): void => {
    it( 'should limit center within box', (): void => {
      // Arrange
      const context = new TestContext();
      context._size.set( 1, 2 );
      const application = new Application( context );
      const viewport = new Viewport( context, application );
      viewport.viewCenterLimit.min.set( -10, -10 );
      viewport.viewCenterLimit.max.set( 10, 10 );

      // Act
      viewport.viewCenter.set( 200, -200 );

      // Assert
      const expectedCenter = new Vector2( 10, -10 );
      expect( viewport.viewCenter.closeTo( expectedCenter ) ).to.be.true;
    } );

    it( 'should limit view scale', (): void => {
      // Arrange
      const context = new TestContext();
      context._size.set( 1, 2 );
      const application = new Application( context );
      const viewport = new Viewport( context, application );
      viewport.scaleMax = 10;

      // Act
      viewport.viewScale.x = 200;

      // Assert
      expect( viewport.viewScale.x ).to.equal( 10 );
    } );
  } );
} );
