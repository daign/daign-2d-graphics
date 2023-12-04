import { expect } from 'chai';

import { Vector2 } from '@daign/math';
import { GraphicNode } from '@daign/2d-pipeline';

import { ClipPath, Line } from '../../lib';

describe( 'ClipPath', (): void => {
  describe( 'constructor', (): void => {
    it( 'should set the base class clip-path', (): void => {
      // Act
      const clipPath = new ClipPath();

      // Assert
      expect( ( clipPath as any ).classNames.getByName( 'baseClass' ).value )
        .to.equal( 'clip-path' );
    } );
  } );

  describe( 'getBox', (): void => {
    it( 'should get the bounding box of the clip path', (): void => {
      // Arrange
      const clipPath = new ClipPath();

      const line1 = new Line();
      line1.start = new Vector2( 7, 2 );
      line1.end = new Vector2( 3, 8 );
      clipPath.appendChild( line1 );

      const line2 = new Line();
      line2.start = new Vector2( 5, 6 );
      line2.end = new Vector2( 1, 0 );
      clipPath.appendChild( line2 );

      // Act
      const box = clipPath.getBox();

      // Assert
      expect( box.min.equals( new Vector2( 1, 0 ) ) ).to.be.true;
      expect( box.max.equals( new Vector2( 7, 8 ) ) ).to.be.true;
    } );

    it( 'should ignore children that are not StyledGraphicNodes', (): void => {
      // Arrange
      const clipPath = new ClipPath();

      const graphicNode = new GraphicNode();
      clipPath.appendChild( graphicNode );

      // Act
      const box = clipPath.getBox();

      // Assert
      expect( box.isEmpty ).to.be.true;
    } );
  } );
} );
