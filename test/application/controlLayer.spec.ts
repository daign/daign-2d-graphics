import { expect } from 'chai';
import { spy } from 'sinon';

import { View } from '@daign/2d-pipeline';
import { Vector2 } from '@daign/math';

import { Application, ButtonObject, ControlLayer, ControlObject } from '../../lib';
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

    it( 'should call createControls when there are changes in the selection manager', (): void => {
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
      const spyCreateControls = spy( controlLayer, 'createControls' );

      // Act
      application.selectionManager.setSelection( controlObject, null );

      // Assert
      expect( spyCreateControls.calledOnce ).to.be.true;
    } );
  } );

  describe( 'createControls', (): void => {
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
      expect( controlLayer.children.length ).to.be.greaterThan( 0 );

      // Act
      application.selectionManager.setSelection( null, null );

      // Assert
      expect( controlLayer.children.length ).to.equal( 0 );
    } );

    it( 'should create a child for every point in the control object', (): void => {
      // Arrange
      const context = new TestContext();
      const application = new Application( context );
      const controlLayer = new ControlLayer( application );

      const view = new View();
      view.mountNode( application );

      const controlObject = new TestObject();
      controlObject.points.push( new Vector2( 1, 2 ) );
      controlObject.points.push( new Vector2( 2, 3 ) );
      controlObject.points.push( new Vector2( 3, 4 ) );
      application.drawingLayer.appendChild( controlObject );

      // Act
      application.selectionManager.setSelection( controlObject, null );

      // Assert
      expect( controlLayer.children.length ).to.equal( 3 );
    } );

    it( 'should create a child for every button in the control object', (): void => {
      // Arrange
      const context = new TestContext();
      const application = new Application( context );
      const controlLayer = new ControlLayer( application );

      const view = new View();
      view.mountNode( application );

      const controlObject = new TestObject();
      const buttonCallback = (): void => {};
      controlObject.buttons.push( new ButtonObject( buttonCallback ) );
      application.drawingLayer.appendChild( controlObject );

      // Act
      application.selectionManager.setSelection( controlObject, null );

      // Assert
      expect( controlLayer.children.length ).to.equal( 1 );
    } );
  } );
} );
