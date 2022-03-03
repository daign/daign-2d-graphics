import { expect } from 'chai';
import * as sinon from 'sinon';

import { View } from '@daign/2d-pipeline';

import { Application, ControlObject } from '../../lib';
import { TestContext } from '../testContext';

class TestObject extends ControlObject {
  public constructor() {
    super();
  }
  public redraw(): void {}
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
  } );

  describe( 'fitToContent', (): void => {
    it( 'should call fitToContent on drawingLayer', (): void => {
      // Arrange
      const context = new TestContext();
      const application = new Application( context );
      const spy = sinon.spy( application.drawingLayer, 'fitToContent' );

      // Act
      application.fitToContent( 2 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
      expect( spy.calledWith( 2 ) ).to.be.true;
    } );
  } );

  describe( 'activateElement', (): void => {
    it( 'should call activateElement on controlLayer', (): void => {
      // Arrange
      const context = new TestContext();
      const application = new Application( context, true );
      const spy = sinon.spy( application.controlLayer!, 'activateElement' );

      const view = new View();
      view.mountNode( application );

      const controlObject = new TestObject();
      application.drawingLayer.appendChild( controlObject );

      // Act
      application.activateElement( controlObject );

      // Assert
      expect( spy.calledOnce ).to.be.true;
      expect( spy.calledWith( controlObject ) ).to.be.true;
    } );

    it( 'should not call redraw observable when application is not interactive', (): void => {
      // Arrange
      const context = new TestContext();
      const application = new Application( context, false );

      const controlObject = new TestObject();
      const redrawSpy = sinon.spy( application.drawingLayer.redrawObservable, 'notify' );

      // Act
      application.activateElement( controlObject );

      // Assert
      expect( redrawSpy.notCalled ).to.be.true;
    } );
  } );

  describe( 'deactivateElement', (): void => {
    it( 'should call deactivateElement on controlLayer', (): void => {
      // Arrange
      const context = new TestContext();
      const application = new Application( context, true );
      const spy = sinon.spy( application.controlLayer!, 'deactivateElement' );

      const view = new View();
      view.mountNode( application );

      const controlObject = new TestObject();
      application.drawingLayer.appendChild( controlObject );
      application.activateElement( controlObject );

      // Act
      application.deactivateElement();

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not throw error when control layer does not exist', (): void => {
      // Arrange
      const context = new TestContext();
      const application = new Application( context, false );

      // Act
      const goodFn = (): void => {
        application.deactivateElement();
      };

      // Assert
      expect( goodFn ).to.not.throw();
    } );
  } );

  describe( 'createControls', (): void => {
    it( 'should call createControls on controlLayer', (): void => {
      // Arrange
      const context = new TestContext();
      const application = new Application( context, true );
      const spy = sinon.spy( application.controlLayer!, 'createControls' );

      const view = new View();
      view.mountNode( application );

      // Act
      application.createControls();

      // Assert
      expect( spy.calledOnce ).to.be.true;
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
