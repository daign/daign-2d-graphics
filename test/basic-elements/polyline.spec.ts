import { expect } from 'chai';

import { Polyline } from '../../lib';

describe( 'Polyline', (): void => {
  describe( 'constructor', (): void => {
    it( 'should set the base class polyline', (): void => {
      // Act
      const polyline = new Polyline();

      // Assert
      expect( ( polyline as any ).classNames.getByName( 'baseClass' ).value )
        .to.equal( 'polyline' );
    } );
  } );
} );
