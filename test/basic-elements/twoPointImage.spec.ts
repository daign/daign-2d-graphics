import { expect } from 'chai';

import { TwoPointImage } from '../../lib';

describe( 'TwoPointImage', (): void => {
  describe( 'constructor', (): void => {
    it( 'should set base class image', (): void => {
      // Act
      const image = new TwoPointImage();

      // Assert
      expect( ( image as any ).classNames.getByName( 'baseClass' ).value ).to.equal( 'image' );
    } );
  } );
} );
