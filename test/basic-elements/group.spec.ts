import { expect } from 'chai';

import { Vector2 } from '@daign/math';

import { Group, Line } from '../../lib';

describe( 'Group', (): void => {
  describe( 'constructor', (): void => {
    it( 'should set the base class group', (): void => {
      // Act
      const group = new Group();

      // Assert
      expect( ( group as any ).classNames.getByName( 'baseClass' ).value ).to.equal( 'group' );
    } );
  } );

  describe( 'getBox', (): void => {
    it( 'should get the bounding box of the group', (): void => {
      // Arrange
      const group = new Group();

      const line1 = new Line();
      line1.start = new Vector2( 7, 2 );
      line1.end = new Vector2( 3, 8 );
      group.appendChild( line1 );

      const line2 = new Line();
      line2.start = new Vector2( 5, 6 );
      line2.end = new Vector2( 1, 0 );
      group.appendChild( line2 );

      // Act
      const box = group.getBox();

      // Assert
      expect( box.min.equals( new Vector2( 1, 0 ) ) ).to.be.true;
      expect( box.max.equals( new Vector2( 7, 8 ) ) ).to.be.true;
    } );
  } );
} );
