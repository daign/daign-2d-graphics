import { expect } from 'chai';

import { Matrix3, Vector2 } from '@daign/math';

import { TwoPointCircle } from '../../lib';

describe( 'TwoPointCircle', (): void => {
  describe( 'get center', (): void => {
    it( 'should return the first point', (): void => {
      // Arrange
      const point = new Vector2( 1, 2 );
      const circle = new TwoPointCircle();
      circle.points.getElement( 0 )!.copy( point );

      // Act
      const result = circle.center;

      // Assert
      expect( result.equals( point ) ).to.be.true;
    } );
  } );

  describe( 'set center', (): void => {
    it( 'should set the first point', (): void => {
      // Arrange
      const point = new Vector2( 1, 2 );
      const circle = new TwoPointCircle();

      // Act
      circle.center = point;

      // Assert
      expect( circle.points.getElement( 0 )!.equals( point ) ).to.be.true;
    } );
  } );

  describe( 'get circlePoint', (): void => {
    it( 'should return the second point', (): void => {
      // Arrange
      const point = new Vector2( 1, 2 );
      const circle = new TwoPointCircle();
      circle.points.getElement( 1 )!.copy( point );

      // Act
      const result = circle.circlePoint;

      // Assert
      expect( result.equals( point ) ).to.be.true;
    } );
  } );

  describe( 'set circlePoint', (): void => {
    it( 'should set the second point', (): void => {
      // Arrange
      const point = new Vector2( 1, 2 );
      const circle = new TwoPointCircle();

      // Act
      circle.circlePoint = point;

      // Assert
      expect( circle.points.getElement( 1 )!.equals( point ) ).to.be.true;
    } );
  } );

  describe( 'constructor', (): void => {
    it( 'should initialize with two points', (): void => {
      // Act
      const circle = new TwoPointCircle();

      // Assert
      expect( circle.points.length ).to.equal( 2 );
      expect( circle.points.containsName( 'center' ) ).to.be.true;
      expect( circle.points.containsName( 'circlePoint' ) ).to.be.true;
    } );
  } );

  describe( 'getRadiusTransformed', (): void => {
    it( 'should return the transformed radius', (): void => {
      // Arrange
      const circle = new TwoPointCircle();
      circle.center = new Vector2( 1, 1 );
      circle.circlePoint = new Vector2( 1, 3 );
      const transformation = new Matrix3().setScaling( new Vector2( 2, 2 ) );

      // Act
      const radius = circle.getRadiusTransformed( transformation );

      // Assert
      expect( radius ).to.equal( 4 );
    } );
  } );

  describe( 'getCenterTransformed', (): void => {
    it( 'should return the transformed center', (): void => {
      // Arrange
      const circle = new TwoPointCircle();
      circle.center = new Vector2( 1, 1 );
      const transformation = new Matrix3().setScaling( new Vector2( 2, 2 ) );

      // Act
      const center = circle.getCenterTransformed( transformation );

      // Assert
      expect( center.equals( new Vector2( 2, 2 ) ) ).to.be.true;
    } );
  } );
} );
