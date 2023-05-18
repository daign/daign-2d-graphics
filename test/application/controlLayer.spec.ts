import { expect } from 'chai';
import { spy } from 'sinon';

import { View } from '@daign/2d-pipeline';
import { Vector2 } from '@daign/math';

import { Application, ControlLayer, ControlObject } from '../../lib';
import { TestContext } from '../testContext';

class TestObject extends ControlObject {
  public constructor() {
    super();
  }
}

describe( 'ControlLayer', (): void => {
  describe( 'constructor', (): void => {
    it( 'should set the corresponding application reference', (): void => {
      // Arrange
      const context = new TestContext();
      const application = new Application( context );

      // Act
      const controlLayer = new ControlLayer( application );

      // Assert
      expect( ( controlLayer as any ).application ).to.equal( application );
    } );

    it( 'should call redrawControls when update manager emits signal', (): void => {
      // Arrange
      const context = new TestContext();
      const application = new Application( context );
      const controlLayer = new ControlLayer( application );
      const redrawControlsSpy = spy( controlLayer as any, 'redrawControls' );

      // Act
      application.updateManager.redraw();

      // Assert
      expect( redrawControlsSpy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'redrawControls', (): void => {
    it( 'should attach the node returned from the active object', (): void => {
      // Arrange
      const context = new TestContext();
      const application = new Application( context );
      const controlLayer = new ControlLayer( application );

      const view = new View();
      view.mountNode( application );

      const targetPoint = new Vector2( 1, 2 );
      const controlObject = new TestObject();
      controlObject.points.push( targetPoint );
      application.drawingLayer.appendChild( controlObject );

      application.selectionManager.setSelection( controlObject, null );

      // Act
      ( controlLayer as any ).redrawControls();

      // Assert
      expect( controlLayer.children.length ).to.equal( 1 );

      // Act
      application.selectionManager.setSelection( null, null );
      ( controlLayer as any ).redrawControls();

      // Assert
      expect( controlLayer.children.length ).to.equal( 0 );
    } );

    it( 'should clear the children of the control layer when no element is active', (): void => {
      // Arrange
      const context = new TestContext();
      const application = new Application( context );
      const controlLayer = new ControlLayer( application );

      const view = new View();
      view.mountNode( application );

      const targetPoint = new Vector2( 1, 2 );
      const controlObject = new TestObject();
      controlObject.points.push( targetPoint );
      application.drawingLayer.appendChild( controlObject );

      application.selectionManager.setSelection( controlObject, null );
      ( controlLayer as any ).redrawControls();
      expect( controlLayer.children.length ).to.equal( 1 );

      // Act
      application.selectionManager.setSelection( null, null );
      ( controlLayer as any ).redrawControls();

      // Assert
      expect( controlLayer.children.length ).to.equal( 0 );
    } );
  } );
} );
