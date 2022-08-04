import { expect } from 'chai';
import { spy } from 'sinon';

import { Vector2 } from '@daign/math';
import { View } from '@daign/2d-pipeline';

import { Application, ControlObject } from '../../lib';
import { TestContext } from '../testContext';

class TestObject extends ControlObject {
  public constructor() {
    super();
  }
}

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

    it( 'should call createControls when there are changes in the selection manager', (): void => {
      // Arrange
      const context = new TestContext();
      const application = new Application( context, true );

      const view = new View();
      view.mountNode( application );

      const targetPoint = new Vector2( 1, 2 );
      const controlObject = new TestObject();
      controlObject.points.push( targetPoint );
      application.drawingLayer.appendChild( controlObject );
      const spyCreateControls = spy( application.controlLayer!, 'createControls' );

      // Act
      application.selectionManager.setSelection( controlObject, null );

      // Assert
      expect( spyCreateControls.calledOnce ).to.be.true;
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

  describe( 'createControls', (): void => {
    it( 'should call createControls on controlLayer', (): void => {
      // Arrange
      const context = new TestContext();
      const application = new Application( context, true );
      const spyCreateControls = spy( application.controlLayer!, 'createControls' );

      const view = new View();
      view.mountNode( application );

      // Act
      application.createControls();

      // Assert
      expect( spyCreateControls.calledOnce ).to.be.true;
    } );

    it( 'should not throw error when control layer does not exist', (): void => {
      // Arrange
      const context = new TestContext();
      const application = new Application( context, false );

      // Act
      const goodFn = (): void => {
        application.createControls();
      };

      // Assert
      expect( goodFn ).to.not.throw();
    } );
  } );
} );
