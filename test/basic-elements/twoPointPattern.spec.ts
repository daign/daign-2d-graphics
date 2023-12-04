import { expect } from 'chai';

import { Matrix3, Vector2 } from '@daign/math';

import { TwoPointPattern } from '../../lib';

describe( 'TwoPointPattern', (): void => {
  describe( 'getter and setter start', (): void => {
    it( 'should set and get the start position', (): void => {
      // Arrange
      const vector = new Vector2( 1, 1 );
      const pattern = new TwoPointPattern();

      // Act and assert
      pattern.start = vector;
      expect( pattern.start.equals( vector ) ).to.be.true;
    } );
  } );

  describe( 'getter and setter end', (): void => {
    it( 'should set and get the end position', (): void => {
      // Arrange
      const vector = new Vector2( 1, 1 );
      const pattern = new TwoPointPattern();

      // Act and assert
      pattern.end = vector;
      expect( pattern.end.equals( vector ) ).to.be.true;
    } );
  } );

  describe( 'constructor', (): void => {
    it( 'should initialize with two points', (): void => {
      // Act
      const pattern = new TwoPointPattern();

      // Assert
      expect( pattern.points.length ).to.equal( 2 );
      expect( pattern.points.containsName( 'start' ) ).to.be.true;
      expect( pattern.points.containsName( 'end' ) ).to.be.true;
    } );
  } );

  describe( 'getStartTransformed', (): void => {
    it( 'should return the transformed start', (): void => {
      // Arrange
      const pattern = new TwoPointPattern();
      pattern.start = new Vector2( 1, 1 );
      pattern.end = new Vector2( 3, 3 );
      const transformation = new Matrix3().setScaling( new Vector2( 2, 2 ) );

      // Act
      const start = pattern.getStartTransformed( transformation );

      // Assert
      expect( start.equals( new Vector2( 2, 2 ) ) ).to.be.true;
    } );
  } );

  describe( 'getEndTransformed', (): void => {
    it( 'should return the transformed end', (): void => {
      // Arrange
      const pattern = new TwoPointPattern();
      pattern.start = new Vector2( 1, 1 );
      pattern.end = new Vector2( 3, 3 );
      const transformation = new Matrix3().setScaling( new Vector2( 2, 2 ) );

      // Act
      const end = pattern.getEndTransformed( transformation );

      // Assert
      expect( end.equals( new Vector2( 6, 6 ) ) ).to.be.true;
    } );
  } );

  describe( 'getSizeTransformed', (): void => {
    it( 'should return the transformed size', (): void => {
      // Arrange
      const pattern = new TwoPointPattern();
      pattern.start = new Vector2( 1, 1 );
      pattern.end = new Vector2( 3, 3 );
      const transformation = new Matrix3().setScaling( new Vector2( 2, 2 ) );

      // Act
      const size = pattern.getSizeTransformed( transformation );

      // Assert
      expect( size.equals( new Vector2( 4, 4 ) ) ).to.be.true;
    } );
  } );
} );
