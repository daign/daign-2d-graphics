import { expect } from 'chai';

import { Polygon } from '../../lib';

describe( 'Polygon', (): void => {
  describe( 'constructor', (): void => {
    it( 'should set the base class polygon', (): void => {
      // Act
      const polygon = new Polygon();

      // Assert
      expect( ( polygon as any ).classNames.getByName( 'baseClass' ).value )
        .to.equal( 'polygon' );
    } );
  } );
} );
