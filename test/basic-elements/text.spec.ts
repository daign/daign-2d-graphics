import { expect } from 'chai';

import { Text } from '../../lib';

describe( 'Text', (): void => {
  describe( 'constructor', (): void => {
    it( 'should set base class text', (): void => {
      // Act
      const text = new Text();

      // Assert
      expect( ( text as any ).classNames.getByName( 'baseClass' ).value ).to.equal( 'text' );
    } );
  } );
} );
