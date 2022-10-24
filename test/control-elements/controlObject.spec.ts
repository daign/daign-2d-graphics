import { expect } from 'chai';
import * as sinon from 'sinon';

import { StringValue, Vector2 } from '@daign/math';
import { View } from '@daign/2d-pipeline';

import { Application, ButtonObject, ControlObject, Group, IControlGuide,
  StyledGraphicNode } from '../../lib';

import { TestContext } from '../testContext';

class TestObject extends ControlObject {
  public constructor() {
    super();
  }
}

class TestControlGuide implements IControlGuide {
  public redraw(): StyledGraphicNode {
    return new Group();
  }
}

class NullControlGuide implements IControlGuide {
  public redraw(): null {
    return null;
  }
}

describe( 'ControlObject', (): void => {
  describe( 'constructor', (): void => {
    it( 'should call redraw method when points array changes', (): void => {
      // Arrange
      const controlObject = new TestObject();
      const spy = sinon.spy( controlObject, 'redraw' );

      // Act
      controlObject.points.initializeElements( 1 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'redraw', (): void => {
    it( 'should clear the child objects', (): void => {
      // Arrange
      const controlObject = new TestObject();
      const child = new Group();
      controlObject.appendChild( child );

      // Act
      controlObject.redraw();

      // Assert
      expect( controlObject.children.length ).to.equal( 0 );
    } );
  } );

  describe( 'redrawControlObjects', (): void => {
    it( 'should create a child for every point in the control object', (): void => {
      // Arrange
      const context = new TestContext();
      const application = new Application( context );

      const view = new View();
      view.mountNode( application );

      const controlObject = new TestObject();
      controlObject.points.push( new Vector2( 1, 2 ) );
      controlObject.points.push( new Vector2( 2, 3 ) );
      controlObject.points.push( new Vector2( 3, 4 ) );
      application.drawingLayer.appendChild( controlObject );

      // Act
      const node = controlObject.redrawControlObjects( null, application );

      // Assert
      expect( node.children.length ).to.equal( 3 );
    } );

    it( 'should add the active class when a point is selected', (): void => {
      // Arrange
      const context = new TestContext();
      const application = new Application( context );

      const view = new View();
      view.mountNode( application );

      const controlObject = new TestObject();
      const activePoint = new Vector2( 2, 3 );
      controlObject.points.push( new Vector2( 1, 2 ) );
      controlObject.points.push( activePoint );
      controlObject.points.push( new Vector2( 3, 4 ) );
      application.drawingLayer.appendChild( controlObject );

      // Act
      const node = controlObject.redrawControlObjects( activePoint, application );

      // Assert
      expect( node.children.length ).to.equal( 3 );
      expect( ( node.children[ 0 ] as any ).classNames.elements
        .some( ( x: StringValue ): boolean => {
          return x.value === 'active';
        } )
      ).to.be.false;
      expect( ( node.children[ 1 ] as any ).classNames.elements
        .some( ( x: StringValue ): boolean => {
          return x.value === 'active';
        } )
      ).to.be.true;
      expect( ( node.children[ 2 ] as any ).classNames.elements
        .some( ( x: StringValue ): boolean => {
          return x.value === 'active';
        } )
      ).to.be.false;
    } );

    it( 'should create a child for every button in the control object', (): void => {
      // Arrange
      const context = new TestContext();
      const application = new Application( context );

      const view = new View();
      view.mountNode( application );

      const controlObject = new TestObject();
      const buttonCallback = (): void => {};
      controlObject.buttons.push( new ButtonObject( buttonCallback ) );
      application.drawingLayer.appendChild( controlObject );

      // Act
      const node = controlObject.redrawControlObjects( null, application );

      // Assert
      expect( node.children.length ).to.equal( 1 );
    } );

    it( 'should create a child for every control guide in the control object', (): void => {
      // Arrange
      const context = new TestContext();
      const application = new Application( context );

      const view = new View();
      view.mountNode( application );

      const controlObject = new TestObject();

      controlObject.controlGuides.push( new TestControlGuide() );
      controlObject.controlGuides.push( new TestControlGuide() );
      application.drawingLayer.appendChild( controlObject );

      // Act
      const node = controlObject.redrawControlObjects( null, application );

      // Assert
      expect( node.children.length ).to.equal( 2 );
    } );

    it( 'should not add a child when the control guide returns null', (): void => {
      // Arrange
      const context = new TestContext();
      const application = new Application( context );

      const view = new View();
      view.mountNode( application );

      const controlObject = new TestObject();

      controlObject.controlGuides.push( new NullControlGuide() );
      application.drawingLayer.appendChild( controlObject );

      // Act
      const node = controlObject.redrawControlObjects( null, application );

      // Assert
      expect( node.children.length ).to.equal( 0 );
    } );
  } );
} );
