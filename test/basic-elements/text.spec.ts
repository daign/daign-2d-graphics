import { expect } from 'chai';

import { Text } from '../../lib';

describe( 'Text', (): void => {
  describe( 'constructor', (): void => {
    it( 'should initialize with one point', (): void => {
      // Act
      const text = new Text();

      // Assert
      expect( text.points.length ).to.equal( 1 );
      expect( text.points.containsName( 'anchor' ) ).to.be.true;
    } );
  } );
} );
