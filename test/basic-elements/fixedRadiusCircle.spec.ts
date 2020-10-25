import { expect } from 'chai';

import { FixedRadiusCircle } from '../../lib';

describe( 'FixedRadiusCircle', (): void => {
  describe( 'constructor', (): void => {
    it( 'should initialize with one point', (): void => {
      // Act
      const circle = new FixedRadiusCircle();

      // Assert
      expect( circle.points.length ).to.equal( 1 );
      expect( circle.points.containsName( 'center' ) ).to.be.true;
    } );
  } );
} );
