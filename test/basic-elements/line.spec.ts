import { expect } from 'chai';

import { Matrix3, Vector2 } from '@daign/math';

import { Line } from '../../lib';

describe( 'Line', (): void => {
  describe( 'getter and setter start', (): void => {
    it( 'should set and get the start position', (): void => {
      // Arrange
      const vector = new Vector2( 1, 1 );
      const line = new Line();

      // Act and assert
      line.start = vector;
      expect( line.start.equals( vector ) ).to.be.true;
    } );
  } );

  describe( 'getter and setter end', (): void => {
    it( 'should set and get the end position', (): void => {
      // Arrange
      const vector = new Vector2( 1, 1 );
      const line = new Line();

      // Act and assert
      line.end = vector;
      expect( line.end.equals( vector ) ).to.be.true;
    } );
  } );

  describe( 'constructor', (): void => {
    it( 'should initialize with two points', (): void => {
      // Act
      const line = new Line();

      // Assert
      expect( line.points.length ).to.equal( 2 );
      expect( line.points.containsName( 'start' ) ).to.be.true;
      expect( line.points.containsName( 'end' ) ).to.be.true;
    } );
  } );

  describe( 'getStartTransformed', (): void => {
    it( 'should return the transformed start', (): void => {
      // Arrange
      const line = new Line();
      line.start = new Vector2( 1, 1 );
      line.end = new Vector2( 3, 3 );
      const transformation = new Matrix3().setScaling( new Vector2( 2, 2 ) );

      // Act
      const start = line.getStartTransformed( transformation );

      // Assert
      expect( start.equals( new Vector2( 2, 2 ) ) ).to.be.true;
    } );
  } );

  describe( 'getEndTransformed', (): void => {
    it( 'should return the transformed end', (): void => {
      // Arrange
      const line = new Line();
      line.start = new Vector2( 1, 1 );
      line.end = new Vector2( 3, 3 );
      const transformation = new Matrix3().setScaling( new Vector2( 2, 2 ) );

      // Act
      const end = line.getEndTransformed( transformation );

      // Assert
      expect( end.equals( new Vector2( 6, 6 ) ) ).to.be.true;
    } );
  } );
} );
