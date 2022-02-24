import { expect } from 'chai';
import * as sinon from 'sinon';

import { Matrix3, StringValue, Vector2 } from '@daign/math';
import { MatrixTransform, TransformCollection } from '@daign/2d-pipeline';

import { StyledGraphicNode } from '../lib';

class TestNode extends StyledGraphicNode {
  public constructor() {
    super();
  }
}

describe( 'StyledGraphicNode', (): void => {
  describe( 'setter baseClass', (): void => {
    it( 'should add the base class to the array of class names', (): void => {
      // Arrange
      const node = new TestNode();

      // Act
      ( node as any ).baseClass = 'SomeName';

      // Assert
      expect( ( node as any ).classNames.getByName( 'baseClass' ).value ).to.equal( 'SomeName' );
    } );

    it( 'should overwrite the base class if it was already set', (): void => {
      // Arrange
      const node = new TestNode();
      ( node as any ).classNames.push( new StringValue( 'InitialValue' ), 'baseClass' );

      // Act
      ( node as any ).baseClass = 'SomeName';

      // Assert
      expect( ( node as any ).classNames.getByName( 'baseClass' ).value ).to.equal( 'SomeName' );
    } );
  } );

  describe( 'constructor', (): void => {
    it( 'should call buildStyleSelector when classNames array has changes', (): void => {
      // Arrange
      const node = new TestNode();
      const spyBuildStyleSelector = sinon.spy( node as any, 'buildStyleSelector' );

      // Act
      ( node as any ).classNames.push( new StringValue( 'someClassName' ), 'baseClass' );

      // Assert
      expect( spyBuildStyleSelector.calledOnce ).to.be.true;
    } );
  } );

  describe( 'addClass', (): void => {
    it( 'should append to class names array', (): void => {
      // Arrange
      const node = new TestNode();

      // Act
      node.addClass( 'SomeName' );

      // Assert
      expect( ( node as any ).classNames.getElement( 0 )!.value ).to.equal( 'SomeName' );
    } );
  } );

  describe( 'getPointsTransformed', (): void => {
    it( 'should return the points transformed by the given transformation', (): void => {
      // Arrange
      const node = new TestNode();
      node.points.push( new Vector2( 5, 6 ) );
      const transformation = new Matrix3().setTranslation( new Vector2( 1, 2 ) );

      // Act
      const result = node.getPointsTransformed( transformation );

      // Assert
      expect( result.length ).to.equal( 1 );
      expect( result[0].equals( new Vector2( 6, 8 ) ) ).to.be.true;
    } );
  } );

  describe( 'getBoxTransformed', (): void => {
    it( 'should return the transformed bounding box', (): void => {
      // Arrange
      const node = new TestNode();
      node.points.push( new Vector2( 5, 2 ) );
      node.points.push( new Vector2( 1, 6 ) );
      const transformCollection = new TransformCollection();
      const matrixTransform = new MatrixTransform();
      matrixTransform.matrix.setTranslation( new Vector2( 1, 2 ) );
      transformCollection.push( matrixTransform );
      node.transformation = transformCollection;

      // Act
      const result = node.getBoxTransformed();

      // Assert
      expect( result.min.equals( new Vector2( 2, 4 ) ) ).to.be.true;
      expect( result.max.equals( new Vector2( 6, 8 ) ) ).to.be.true;
    } );
  } );

  describe( 'getBox', (): void => {
    it( 'should return the bounding box of all contained points', (): void => {
      // Arrange
      const node = new TestNode();
      node.points.push( new Vector2( 5, 2 ) );
      node.points.push( new Vector2( 1, 6 ) );

      // Act
      const result = node.getBox();

      // Assert
      expect( result.min.equals( new Vector2( 1, 2 ) ) ).to.be.true;
      expect( result.max.equals( new Vector2( 5, 6 ) ) ).to.be.true;
    } );
  } );

  describe( 'addClass', (): void => {
    it( 'should add a class name', (): void => {
      // Arrange
      const node = new TestNode();

      // Act
      node.addClass( 'SomeClassName' );

      // Assert
      expect( ( node as any ).classNames.elements[0].value ).to.equal( 'SomeClassName' );
    } );
  } );

  describe( 'setVariableClass', (): void => {
    it( 'should add a class name with identifier', (): void => {
      // Arrange
      const node = new TestNode();
      const key = 'SomeIdentifier';

      // Act
      node.setVariableClass( key, 'SomeClassName' );

      // Assert
      expect( ( node as any ).classNames.getByName( key ).value ).to.equal( 'SomeClassName' );
    } );

    it( 'should overwrite a class name with identifier', (): void => {
      // Arrange
      const node = new TestNode();
      const key = 'SomeIdentifier';
      ( node as any ).classNames.push( new StringValue( 'InitialName' ), key );

      // Act
      node.setVariableClass( key, 'SomeClassName' );

      // Assert
      expect( ( node as any ).classNames.getByName( key ).value ).to.equal( 'SomeClassName' );
    } );

    it( 'should throw error when identifier is called baseClass', (): void => {
      // Arrange
      const node = new TestNode();

      // Act
      const badFn = (): void => {
        node.setVariableClass( 'baseClass', 'SomeClassName' );
      };

      // Assert
      expect( badFn ).to.throw( 'baseClass is a protected identifier.' );
    } );
  } );

  describe( 'buildStyleSelector', (): void => {
    it( 'should calculate the style selector', (): void => {
      // Arrange
      const node = new TestNode();
      node.addClass( 'FirstClass' );
      ( node as any ).baseClass = 'SecondClass';

      // Act
      ( node as any ).buildStyleSelector();

      // Assert
      const classNames = ( node.styleSelector as any ).classNames;
      expect( classNames.length ).to.equal( 2 );
      expect( classNames[ 0 ] ).to.equal( 'FirstClass' );
      expect( classNames[ 1 ] ).to.equal( 'SecondClass' );
    } );
  } );
} );
