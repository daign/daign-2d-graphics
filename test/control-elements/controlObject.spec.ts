import { expect } from 'chai';
import { spy } from 'sinon';

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
      const redrawSpy = spy( controlObject, 'redraw' );

      // Act
      controlObject.points.initializeElements( 1 );

      // Assert
      expect( redrawSpy.calledOnce ).to.be.true;
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

  describe( 'getDeepCopyOfPoints', (): void => {
    it( 'should return a copy of the control points', (): void => {
      // Arrange
      const points = [
        new Vector2( 1, 2 ),
        new Vector2( 2, 3 ),
        new Vector2( 3, 4 )
      ];
      const controlObject = new TestObject();
      controlObject.points.push( points[ 0 ] );
      controlObject.points.push( points[ 1 ] );
      controlObject.points.push( points[ 2 ] );

      // Act
      const result = controlObject.getDeepCopyOfPoints();

      // Assert
      expect( result.length ).to.equal( 3 );
      expect( result[ 0 ].equals( points[ 0 ] ) ).to.be.true;
      expect( result[ 1 ].equals( points[ 1 ] ) ).to.be.true;
      expect( result[ 2 ].equals( points[ 2 ] ) ).to.be.true;
    } );
  } );

  describe( 'writeUpdatesToPoints', (): void => {
    it( 'should update the control points', (): void => {
      // Arrange
      const controlObject = new TestObject();
      controlObject.points.push( new Vector2() );
      controlObject.points.push( new Vector2() );
      controlObject.points.push( new Vector2() );

      const updatedPoints = [
        new Vector2( 1, 2 ),
        new Vector2( 2, 3 ),
        new Vector2( 3, 4 )
      ];

      // Act
      controlObject.writeUpdatesToPoints( updatedPoints );

      // Assert
      expect( controlObject.points.length ).to.equal( 3 );
      expect( controlObject.points.getElement( 0 )!.equals( updatedPoints[ 0 ] ) ).to.be.true;
      expect( controlObject.points.getElement( 1 )!.equals( updatedPoints[ 1 ] ) ).to.be.true;
      expect( controlObject.points.getElement( 2 )!.equals( updatedPoints[ 2 ] ) ).to.be.true;
    } );
  } );
} );
