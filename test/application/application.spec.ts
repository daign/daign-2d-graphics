import { expect } from 'chai';
import { spy } from 'sinon';

import { Application } from '../../lib';
import { TestContext } from '../testContext';

describe( 'Application', (): void => {
  describe( 'constructor', (): void => {
    it( 'should append one child to the node', (): void => {
      // Arrange
      const context = new TestContext();

      // Act
      const application = new Application( context );

      // Assert
      expect( application.children.length ).to.equal( 1 );
    } );

    it( 'should append two children to the node if interactive', (): void => {
      // Arrange
      const context = new TestContext();

      // Act
      const interactive = true;
      const application = new Application( context, interactive );

      // Assert
      expect( application.children.length ).to.equal( 2 );
    } );
  } );

  describe( 'fitToContent', (): void => {
    it( 'should call fitToContent on drawingLayer', (): void => {
      // Arrange
      const context = new TestContext();
      const application = new Application( context );
      const spyFitToContent = spy( application.drawingLayer, 'fitToContent' );

      // Act
      application.fitToContent( 2 );

      // Assert
      expect( spyFitToContent.calledOnce ).to.be.true;
      expect( spyFitToContent.calledWith( 2 ) ).to.be.true;
    } );
  } );

  describe( 'redraw', (): void => {
    it( 'should call redraw on update manager', (): void => {
      // Arrange
      const context = new TestContext();
      const application = new Application( context );
      const redrawSpy = spy( application.updateManager, 'redraw' );

      // Act
      application.redraw();

      // Assert
      expect( redrawSpy.calledOnce ).to.be.true;
    } );
  } );
} );
