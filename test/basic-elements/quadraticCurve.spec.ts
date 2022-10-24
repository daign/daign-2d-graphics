import { expect } from 'chai';

import { QuadraticCurve } from '../../lib';

describe( 'QuadraticCurve', (): void => {
  describe( 'constructor', (): void => {
    it( 'should set the base class quadratic-curve', (): void => {
      // Act
      const curve = new QuadraticCurve();

      // Assert
      expect( ( curve as any ).classNames.getByName( 'baseClass' ).value )
        .to.equal( 'quadratic-curve' );
    } );
  } );
} );
