import { expect } from 'chai';

import { Vector2 } from '@daign/math';
import { GraphicNode } from '@daign/2d-pipeline';

import { SymbolElement, Line } from '../../lib';

describe( 'SymbolElement', (): void => {
  describe( 'constructor', (): void => {
    it( 'should set the base class symbol', (): void => {
      // Act
      const symbolElement = new SymbolElement();

      // Assert
      expect( ( symbolElement as any ).classNames.getByName( 'baseClass' ).value )
        .to.equal( 'symbol' );
    } );
  } );

  describe( 'getBox', (): void => {
    it( 'should get the bounding box of the symbol element', (): void => {
      // Arrange
      const symbolElement = new SymbolElement();

      const line1 = new Line();
      line1.start = new Vector2( 7, 2 );
      line1.end = new Vector2( 3, 8 );
      symbolElement.appendChild( line1 );

      const line2 = new Line();
      line2.start = new Vector2( 5, 6 );
      line2.end = new Vector2( 1, 0 );
      symbolElement.appendChild( line2 );

      // Act
      const box = symbolElement.getBox();

      // Assert
      expect( box.min.equals( new Vector2( 1, 0 ) ) ).to.be.true;
      expect( box.max.equals( new Vector2( 7, 8 ) ) ).to.be.true;
    } );

    it( 'should ignore children that are not StyledGraphicNodes', (): void => {
      // Arrange
      const symbolElement = new SymbolElement();

      const graphicNode = new GraphicNode();
      symbolElement.appendChild( graphicNode );

      // Act
      const box = symbolElement.getBox();

      // Assert
      expect( box.isEmpty ).to.be.true;
    } );
  } );
} );
