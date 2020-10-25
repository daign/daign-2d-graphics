import { expect } from 'chai';

import { Line } from '../../lib';

describe( 'Line', (): void => {
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
} );
