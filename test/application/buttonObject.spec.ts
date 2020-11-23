import { expect } from 'chai';

import { ButtonObject } from '../../lib';

describe( 'ButtonObject', (): void => {
  describe( 'constructor', (): void => {
    it( 'should set base class button', (): void => {
      // Arrange
      const callback = (): void => {};

      // Act
      const buttonObject = new ButtonObject( callback );

      // Assert
      expect( ( buttonObject as any ).classNames.getByName( 'baseClass' ).value )
        .to.equal( 'button' );
    } );
  } );
} );
