import { expect } from 'chai';
import { spy } from 'sinon';

import { View } from '@daign/2d-pipeline';

import { Application, UpdateManager } from '../../lib';
import { TestContext } from '../testContext';

describe( 'UpdateManager', (): void => {
  describe( 'constructor', (): void => {
    it( 'should emit a graphic update event when the redraw signal is received', (): void => {
      // Arrange
      const context = new TestContext();
      const application = new Application( context, true );
      const view = new View();
      view.mountNode( application );

      const updateManager = new UpdateManager();
      const graphicUpdateSpy = spy( updateManager.graphicUpdateEvent, 'emit' );

      // Act
      updateManager.redrawSignal.emit();

      // Assert
      expect( graphicUpdateSpy.calledOnce ).to.be.true;
    } );

    it( 'should emit a redraw controls signal when the redraw signal is received', (): void => {
      // Arrange
      const context = new TestContext();
      const application = new Application( context, true );
      const view = new View();
      view.mountNode( application );

      const updateManager = new UpdateManager();
      const redrawControlsSpy = spy( updateManager.redrawControlsSignal, 'emit' );

      // Act
      updateManager.redrawSignal.emit();

      // Assert
      expect( redrawControlsSpy.calledOnce ).to.be.true;
    } );

    it( 'should emit a render signal when the redraw signal is received', (): void => {
      // Arrange
      const context = new TestContext();
      const application = new Application( context, true );
      const view = new View();
      view.mountNode( application );

      const updateManager = new UpdateManager();
      const renderSignalSpy = spy( updateManager.renderSignal, 'emit' );

      // Act
      updateManager.redrawSignal.emit();

      // Assert
      expect( renderSignalSpy.calledOnce ).to.be.true;
    } );
  } );
} );
