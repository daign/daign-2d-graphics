import { expect } from 'chai';

import { GraphicStyle } from '../lib';

describe( 'GraphicStyle', (): void => {
  describe( 'constructor', (): void => {
    it( 'should set the properties', (): void => {
      // Act
      const style = new GraphicStyle( 'black', 'blue', 2, 1, '12px' );

      // Assert
      expect( style.fill ).to.equal( 'black' );
      expect( style.stroke ).to.equal( 'blue' );
      expect( style.strokeWidth ).to.equal( 2 );
      expect( style.opacity ).to.equal( 1 );
      expect( style.fontSize ).to.equal( '12px' );
    } );
  } );
} );
