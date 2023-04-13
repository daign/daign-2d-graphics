import { expect } from 'chai';
import { spy } from 'sinon';

import { Vector2 } from '@daign/math';
import { View } from '@daign/2d-pipeline';

import { Application, ControlLayer, ControlObject, SelectionManager, UpdateManager,
  Viewport } from '../../lib';
import { TestContext } from '../testContext';

class TestObject extends ControlObject {
  public constructor() {
    super();
  }
}

describe( 'UpdateManager', (): void => {
  describe( 'constructor', (): void => {
    it( 'should call createControls when there are changes in the selection manager', (): void => {
      // Arrange
      const context = new TestContext();
      const application = new Application( context, true );
      const selectionManager = new SelectionManager();
      const controlLayer = new ControlLayer( application );
      const drawingLayer = new Viewport( context, application );
      const view = new View();
      view.mountNode( application );

      const targetPoint = new Vector2( 1, 2 );
      const controlObject = new TestObject();
      controlObject.points.push( targetPoint );
      drawingLayer.appendChild( controlObject );

      const updateManager = new UpdateManager( selectionManager, controlLayer, drawingLayer );
      const spyCreateControls = spy( updateManager, 'createControls' );

      // Act
      selectionManager.setSelection( controlObject, null );

      // Assert
      expect( spyCreateControls.calledOnce ).to.be.true;
    } );

    it( 'should call createControls when there are changes on the drawing layer', (): void => {
      // Arrange
      const context = new TestContext();
      const application = new Application( context, true );
      const selectionManager = new SelectionManager();
      const controlLayer = new ControlLayer( application );
      const drawingLayer = new Viewport( context, application );
      const view = new View();
      view.mountNode( application );

      const targetPoint = new Vector2( 1, 2 );
      const controlObject = new TestObject();
      controlObject.points.push( targetPoint );

      const updateManager = new UpdateManager( selectionManager, controlLayer, drawingLayer );
      const spyCreateControls = spy( updateManager, 'createControls' );

      // Act
      drawingLayer.appendChild( controlObject );

      // Assert
      expect( spyCreateControls.calledOnce ).to.be.true;
    } );

    it( 'should call createControls when the viewport has changed', (): void => {
      // Arrange
      const context = new TestContext();
      const application = new Application( context, true );
      const selectionManager = application.selectionManager;
      const controlLayer = application.controlLayer;
      const drawingLayer = application.drawingLayer;
      const view = new View();
      view.mountNode( application );

      const updateManager = new UpdateManager( selectionManager, controlLayer, drawingLayer );
      const spyCreateControls = spy( updateManager, 'createControls' );

      // Act
      updateManager.viewportInputEvent.invoke();

      // Assert
      expect( spyCreateControls.calledOnce ).to.be.true;
    } );
  } );

  describe( 'createControls', (): void => {
    it( 'should call createControls on controlLayer', (): void => {
      // Arrange
      const context = new TestContext();
      const application = new Application( context, true );
      const selectionManager = new SelectionManager();
      const controlLayer = new ControlLayer( application );
      const drawingLayer = new Viewport( context, application );
      const view = new View();
      view.mountNode( application );

      const updateManager = new UpdateManager( selectionManager, controlLayer, drawingLayer );
      const spyCreateControls = spy( updateManager, 'createControls' );

      // Act
      updateManager.createControls();

      // Assert
      expect( spyCreateControls.calledOnce ).to.be.true;
    } );

    it( 'should not throw error when control layer does not exist', (): void => {
      // Arrange
      const context = new TestContext();
      const application = new Application( context, true );
      const selectionManager = new SelectionManager();
      const drawingLayer = new Viewport( context, application );
      const view = new View();
      view.mountNode( application );

      const updateManager = new UpdateManager( selectionManager, null, drawingLayer );

      // Act
      const goodFn = (): void => {
        updateManager.createControls();
      };

      // Assert
      expect( goodFn ).to.not.throw();
    } );
  } );
} );
