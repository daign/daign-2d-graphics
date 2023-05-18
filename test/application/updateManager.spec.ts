import { expect } from 'chai';
import { spy } from 'sinon';

import { View } from '@daign/2d-pipeline';

import { Application, UpdateManager } from '../../lib';
import { TestContext } from '../testContext';

describe( 'UpdateManager', (): void => {
  describe( 'subscribeToRedrawEvent', (): void => {
    it( 'should register a callback that gets informed about redraw events', (): void => {
      // Arrange
      const context = new TestContext();
      const application = new Application( context, true );
      const view = new View();
      view.mountNode( application );
      const updateManager = new UpdateManager();

      // Act
      const redrawSpy = spy();
      updateManager.subscribeToRedrawEvent( redrawSpy );
      updateManager.redraw();

      // Assert
      expect( redrawSpy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'setRedrawControlsFunction', (): void => {
    it( 'should register a callback that gets informed when to redraw the controls', (): void => {
      // Arrange
      const context = new TestContext();
      const application = new Application( context, true );
      const view = new View();
      view.mountNode( application );
      const updateManager = new UpdateManager();

      // Act
      const redrawControlsSpy = spy();
      updateManager.setRedrawControlsFunction( redrawControlsSpy );
      updateManager.redraw();

      // Assert
      expect( redrawControlsSpy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'setRenderFunction', (): void => {
    it( 'should register a callback that gets informed when to render the graphic', (): void => {
      // Arrange
      const context = new TestContext();
      const application = new Application( context, true );
      const view = new View();
      view.mountNode( application );
      const updateManager = new UpdateManager();

      // Act
      const renderSpy = spy();
      updateManager.setRenderFunction( renderSpy );
      updateManager.redraw();

      // Assert
      expect( renderSpy.calledOnce ).to.be.true;
    } );
  } );
} );
