import { expect } from 'chai';

import { Matrix3, Vector2 } from '@daign/math';

import { TwoPointRectangle } from '../../lib';

describe( 'TwoPointRectangle', (): void => {
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
} );
