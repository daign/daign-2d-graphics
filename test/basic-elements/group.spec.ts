import { expect } from 'chai';

import { Group } from '../../lib';

describe( 'Group', (): void => {
  describe( 'constructor', (): void => {
    it( 'should set the base class group', (): void => {
      // Act
      const group = new Group();

      // Assert
      expect( ( group as any ).classNames.getByName( 'baseClass' ).value ).to.equal( 'group' );
    } );
  } );
} );
