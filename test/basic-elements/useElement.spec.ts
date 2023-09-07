import { expect } from 'chai';

import { UseElement } from '../../lib';

describe( 'UseElement', (): void => {
  describe( 'constructor', (): void => {
    it( 'should set base class use', (): void => {
      // Act
      const useElement = new UseElement();

      // Assert
      expect( ( useElement as any ).classNames.getByName( 'baseClass' ).value ).to.equal( 'use' );
    } );
  } );
} );
