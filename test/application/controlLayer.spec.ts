import { expect } from 'chai';

import { View } from '@daign/2d-pipeline';
import { StringValue, Vector2 } from '@daign/math';

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
      controlLayer.createControls();
      expect( controlLayer.children.length ).to.be.greaterThan( 0 );

      // Act
      application.selectionManager.setSelection( null, null );
      controlLayer.createControls();

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
      controlLayer.createControls();

      // Assert
      expect( controlLayer.children.length ).to.equal( 3 );
    } );

    it( 'should add the active class when a point is selected', (): void => {
      // Arrange
      const context = new TestContext();
      const application = new Application( context );
      const controlLayer = new ControlLayer( application );

      const view = new View();
      view.mountNode( application );

      const controlObject = new TestObject();
      const activePoint = new Vector2( 2, 3 );
      controlObject.points.push( new Vector2( 1, 2 ) );
      controlObject.points.push( activePoint );
      controlObject.points.push( new Vector2( 3, 4 ) );
      application.drawingLayer.appendChild( controlObject );

      // Act
      application.selectionManager.setSelection( controlObject, activePoint );
      controlLayer.createControls();

      // Assert
      expect( controlLayer.children.length ).to.equal( 3 );
      expect( ( controlLayer.children[ 0 ] as any ).classNames.elements
        .some( ( x: StringValue ): boolean => {
          return x.value === 'active';
        } )
      ).to.be.false;
      expect( ( controlLayer.children[ 1 ] as any ).classNames.elements
        .some( ( x: StringValue ): boolean => {
          return x.value === 'active';
        } )
      ).to.be.true;
      expect( ( controlLayer.children[ 2 ] as any ).classNames.elements
        .some( ( x: StringValue ): boolean => {
          return x.value === 'active';
        } )
      ).to.be.false;
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
      controlLayer.createControls();

      // Assert
      expect( controlLayer.children.length ).to.equal( 1 );
    } );
  } );
} );
