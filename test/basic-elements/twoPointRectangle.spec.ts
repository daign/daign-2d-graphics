import { expect } from 'chai';

import { Matrix3, Vector2 } from '@daign/math';

import { TwoPointRectangle } from '../../lib';

describe( 'TwoPointRectangle', (): void => {
  describe( 'getter and setter start', (): void => {
    it( 'should set and get the start position', (): void => {
      // Arrange
      const vector = new Vector2( 1, 1 );
      const rectangle = new TwoPointRectangle();

      // Act and assert
      rectangle.start = vector;
      expect( rectangle.start.equals( vector ) ).to.be.true;
    } );
  } );

  describe( 'getter and setter end', (): void => {
    it( 'should set and get the end position', (): void => {
      // Arrange
      const vector = new Vector2( 1, 1 );
      const rectangle = new TwoPointRectangle();

      // Act and assert
      rectangle.end = vector;
      expect( rectangle.end.equals( vector ) ).to.be.true;
    } );
  } );

  describe( 'constructor', (): void => {
    it( 'should initialize with two points', (): void => {
      // Act
      const rectangle = new TwoPointRectangle();

      // Assert
      expect( rectangle.points.length ).to.equal( 2 );
      expect( rectangle.points.containsName( 'start' ) ).to.be.true;
      expect( rectangle.points.containsName( 'end' ) ).to.be.true;
    } );
  } );

  describe( 'getStartTransformed', (): void => {
    it( 'should return the transformed start', (): void => {
      // Arrange
      const rectangle = new TwoPointRectangle();
      rectangle.start = new Vector2( 1, 1 );
      rectangle.end = new Vector2( 3, 3 );
      const transformation = new Matrix3().setScaling( new Vector2( 2, 2 ) );

      // Act
      const start = rectangle.getStartTransformed( transformation );

      // Assert
      expect( start.equals( new Vector2( 2, 2 ) ) ).to.be.true;
    } );
  } );

  describe( 'getEndTransformed', (): void => {
    it( 'should return the transformed end', (): void => {
      // Arrange
      const rectangle = new TwoPointRectangle();
      rectangle.start = new Vector2( 1, 1 );
      rectangle.end = new Vector2( 3, 3 );
      const transformation = new Matrix3().setScaling( new Vector2( 2, 2 ) );

      // Act
      const end = rectangle.getEndTransformed( transformation );

      // Assert
      expect( end.equals( new Vector2( 6, 6 ) ) ).to.be.true;
    } );
  } );

  describe( 'getSizeTransformed', (): void => {
    it( 'should return the transformed size', (): void => {
      // Arrange
      const rectangle = new TwoPointRectangle();
      rectangle.start = new Vector2( 1, 1 );
      rectangle.end = new Vector2( 3, 3 );
      const transformation = new Matrix3().setScaling( new Vector2( 2, 2 ) );

      // Act
      const size = rectangle.getSizeTransformed( transformation );

      // Assert
      expect( size.equals( new Vector2( 4, 4 ) ) ).to.be.true;
    } );
  } );
} );
