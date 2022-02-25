import { expect } from 'chai';

import { Matrix3, Vector2 } from '@daign/math';

import { FixedRadiusCircle } from '../../lib';

describe( 'FixedRadiusCircle', (): void => {
  describe( 'getter and setter center', (): void => {
    it( 'should set and get the center position', (): void => {
      // Arrange
      const vector = new Vector2( 1, 1 );
      const circle = new FixedRadiusCircle();

      // Act and assert
      circle.center = vector;
      expect( circle.center.equals( vector ) ).to.be.true;
    } );
  } );

  describe( 'constructor', (): void => {
    it( 'should initialize with one point', (): void => {
      // Act
      const circle = new FixedRadiusCircle();

      // Assert
      expect( circle.points.length ).to.equal( 1 );
      expect( circle.points.containsName( 'center' ) ).to.be.true;
    } );
  } );

  describe( 'getCenterTransformed', (): void => {
    it( 'should return the transformed center', (): void => {
      // Arrange
      const circle = new FixedRadiusCircle();
      circle.center = new Vector2( 1, 1 );
      const transformation = new Matrix3().setScaling( new Vector2( 2, 2 ) );

      // Act
      const center = circle.getCenterTransformed( transformation );

      // Assert
      expect( center.equals( new Vector2( 2, 2 ) ) ).to.be.true;
    } );
  } );
} );
