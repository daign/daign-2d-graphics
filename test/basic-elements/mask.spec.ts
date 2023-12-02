import { expect } from 'chai';

import { Vector2 } from '@daign/math';
import { GraphicNode } from '@daign/2d-pipeline';

import { Mask, Line } from '../../lib';

describe( 'Mask', (): void => {
  describe( 'constructor', (): void => {
    it( 'should set the base class mask', (): void => {
      // Act
      const mask = new Mask();

      // Assert
      expect( ( mask as any ).classNames.getByName( 'baseClass' ).value ).to.equal( 'mask' );
    } );
  } );

  describe( 'getBox', (): void => {
    it( 'should get the bounding box of the mask', (): void => {
      // Arrange
      const mask = new Mask();

      const line1 = new Line();
      line1.start = new Vector2( 7, 2 );
      line1.end = new Vector2( 3, 8 );
      mask.appendChild( line1 );

      const line2 = new Line();
      line2.start = new Vector2( 5, 6 );
      line2.end = new Vector2( 1, 0 );
      mask.appendChild( line2 );

      // Act
      const box = mask.getBox();

      // Assert
      expect( box.min.equals( new Vector2( 1, 0 ) ) ).to.be.true;
      expect( box.max.equals( new Vector2( 7, 8 ) ) ).to.be.true;
    } );

    it( 'should ignore children that are not StyledGraphicNodes', (): void => {
      // Arrange
      const mask = new Mask();

      const graphicNode = new GraphicNode();
      mask.appendChild( graphicNode );

      // Act
      const box = mask.getBox();

      // Assert
      expect( box.isEmpty ).to.be.true;
    } );
  } );
} );
