import { expect } from 'chai';

import { GraphicStyle } from '../lib';

describe( 'GraphicStyle', (): void => {
  describe( 'getter isEmpty', (): void => {
    it( 'should return true when all properties are null', (): void => {
      // Arrange
      const style = new GraphicStyle();

      // Act
      const result = style.isEmpty;

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return false when at least one property is set', (): void => {
      // Arrange
      const style = new GraphicStyle( 'blue' );

      // Act
      const result = style.isEmpty;

      // Assert
      expect( result ).to.be.false;
    } );
  } );

  describe( 'constructor', (): void => {
    it( 'should set the properties', (): void => {
      // Act
      const style = new GraphicStyle( 'black', 0.9, 'evenodd', 'blue', 2, 0.8, 'square', 'bevel', 4,
        '1,2,3', 10, 'non-scaling-stroke', 'block', 'hidden', 0.7, 'normal', 'url(#mask)',
        'sans-serif', '12px', 'italic', 'small-caps', 'bold', 'ultra-condensed', '2px', '3px',
        'line-through', 'fill', 'pointer' );

      // Assert
      expect( style.fill ).to.equal( 'black' );
      expect( style.fillOpacity ).to.equal( 0.9 );
      expect( style.fillRule ).to.equal( 'evenodd' );
      expect( style.stroke ).to.equal( 'blue' );
      expect( style.strokeWidth ).to.equal( 2 );
      expect( style.strokeOpacity ).to.equal( 0.8 );
      expect( style.strokeLinecap ).to.equal( 'square' );
      expect( style.strokeLinejoin ).to.equal( 'bevel' );
      expect( style.strokeMiterlimit ).to.equal( 4 );
      expect( style.strokeDasharray ).to.equal( '1,2,3' );
      expect( style.strokeDashoffset ).to.equal( 10 );
      expect( style.vectorEffect ).to.equal( 'non-scaling-stroke' );
      expect( style.display ).to.equal( 'block' );
      expect( style.visibility ).to.equal( 'hidden' );
      expect( style.opacity ).to.equal( 0.7 );
      expect( style.paintOrder ).to.equal( 'normal' );
      expect( style.mask ).to.equal( 'url(#mask)' );
      expect( style.fontFamily ).to.equal( 'sans-serif' );
      expect( style.fontSize ).to.equal( '12px' );
      expect( style.fontStyle ).to.equal( 'italic' );
      expect( style.fontVariant ).to.equal( 'small-caps' );
      expect( style.fontWeight ).to.equal( 'bold' );
      expect( style.fontStretch ).to.equal( 'ultra-condensed' );
      expect( style.letterSpacing ).to.equal( '2px' );
      expect( style.wordSpacing ).to.equal( '3px' );
      expect( style.textDecoration ).to.equal( 'line-through' );
      expect( style.pointerEvents ).to.equal( 'fill' );
      expect( style.cursor ).to.equal( 'pointer' );
    } );

    it( 'should create empty style when no parameters are passed', (): void => {
      // Act
      const style = new GraphicStyle();

      // Assert
      expect( style.isEmpty ).to.be.true;
    } );
  } );

  describe( 'parseAttribute', (): void => {
    it( 'should set string properties', (): void => {
      // Arrange
      const style = new GraphicStyle();

      // Act
      style.parseAttribute( 'fill', 'black' );
      style.parseAttribute( 'fill-rule', 'evenodd' );
      style.parseAttribute( 'stroke', 'blue' );
      style.parseAttribute( 'stroke-linecap', 'square' );
      style.parseAttribute( 'stroke-linejoin', 'bevel' );
      style.parseAttribute( 'stroke-dasharray', '1,2,3' );
      style.parseAttribute( 'vector-effect', 'non-scaling-stroke' );
      style.parseAttribute( 'display', 'block' );
      style.parseAttribute( 'visibility', 'hidden' );
      style.parseAttribute( 'paint-order', 'normal' );
      style.parseAttribute( 'mask', 'url(#mask)' );
      style.parseAttribute( 'font-family', 'sans-serif' );
      style.parseAttribute( 'font-size', '12px' );
      style.parseAttribute( 'font-style', 'italic' );
      style.parseAttribute( 'font-variant', 'small-caps' );
      style.parseAttribute( 'font-weight', 'bold' );
      style.parseAttribute( 'font-stretch', 'ultra-condensed' );
      style.parseAttribute( 'letter-spacing', '2px' );
      style.parseAttribute( 'word-spacing', '3px' );
      style.parseAttribute( 'text-decoration', 'line-through' );
      style.parseAttribute( 'pointer-events', 'fill' );
      style.parseAttribute( 'cursor', 'pointer' );
      style.parseAttribute( 'to-be-ignored', 'undefined' );

      // Assert
      expect( style.fill ).to.equal( 'black' );
      expect( style.fillRule ).to.equal( 'evenodd' );
      expect( style.stroke ).to.equal( 'blue' );
      expect( style.strokeLinecap ).to.equal( 'square' );
      expect( style.strokeLinejoin ).to.equal( 'bevel' );
      expect( style.strokeDasharray ).to.equal( '1,2,3' );
      expect( style.vectorEffect ).to.equal( 'non-scaling-stroke' );
      expect( style.display ).to.equal( 'block' );
      expect( style.visibility ).to.equal( 'hidden' );
      expect( style.paintOrder ).to.equal( 'normal' );
      expect( style.mask ).to.equal( 'url(#mask)' );
      expect( style.fontFamily ).to.equal( 'sans-serif' );
      expect( style.fontSize ).to.equal( '12px' );
      expect( style.fontStyle ).to.equal( 'italic' );
      expect( style.fontVariant ).to.equal( 'small-caps' );
      expect( style.fontWeight ).to.equal( 'bold' );
      expect( style.fontStretch ).to.equal( 'ultra-condensed' );
      expect( style.letterSpacing ).to.equal( '2px' );
      expect( style.wordSpacing ).to.equal( '3px' );
      expect( style.textDecoration ).to.equal( 'line-through' );
      expect( style.pointerEvents ).to.equal( 'fill' );
      expect( style.cursor ).to.equal( 'pointer' );
    } );

    it( 'should parse float value properties', (): void => {
      // Arrange
      const style = new GraphicStyle();

      // Act
      style.parseAttribute( 'fill-opacity', '0.9' );
      style.parseAttribute( 'stroke-width', '2' );
      style.parseAttribute( 'stroke-opacity', '0.8' );
      style.parseAttribute( 'stroke-miterlimit', '4' );
      style.parseAttribute( 'stroke-dashoffset', '10' );
      style.parseAttribute( 'opacity', '0.7' );

      // Assert
      expect( style.fillOpacity ).to.equal( 0.9 );
      expect( style.strokeWidth ).to.equal( 2 );
      expect( style.strokeOpacity ).to.equal( 0.8 );
      expect( style.strokeMiterlimit ).to.equal( 4 );
      expect( style.strokeDashoffset ).to.equal( 10 );
      expect( style.opacity ).to.equal( 0.7 );
    } );
  } );

  describe( 'complementWith', (): void => {
    it( 'should copy the values from the source style into an empty target style', (): void => {
      // Arrange
      const style = new GraphicStyle();
      const sourceStyle = new GraphicStyle( 'black', 0.9, 'evenodd', 'blue', 2, 0.8, 'square',
        'bevel', 4, '1,2,3', 10, 'non-scaling-stroke', 'block', 'hidden', 0.7, 'normal',
        'url(#mask)', 'sans-serif', '12px', 'italic', 'small-caps', 'bold', 'ultra-condensed',
        '2px', '3px', 'line-through', 'fill', 'pointer' );

      // Act
      style.complementWith( sourceStyle );

      // Assert
      expect( style.fill ).to.equal( 'black' );
      expect( style.fillOpacity ).to.equal( 0.9 );
      expect( style.fillRule ).to.equal( 'evenodd' );
      expect( style.stroke ).to.equal( 'blue' );
      expect( style.strokeWidth ).to.equal( 2 );
      expect( style.strokeOpacity ).to.equal( 0.8 );
      expect( style.strokeLinecap ).to.equal( 'square' );
      expect( style.strokeLinejoin ).to.equal( 'bevel' );
      expect( style.strokeMiterlimit ).to.equal( 4 );
      expect( style.strokeDasharray ).to.equal( '1,2,3' );
      expect( style.strokeDashoffset ).to.equal( 10 );
      expect( style.vectorEffect ).to.equal( 'non-scaling-stroke' );
      expect( style.display ).to.equal( 'block' );
      expect( style.visibility ).to.equal( 'hidden' );
      expect( style.opacity ).to.equal( 0.7 );
      expect( style.paintOrder ).to.equal( 'normal' );
      expect( style.mask ).to.equal( 'url(#mask)' );
      expect( style.fontFamily ).to.equal( 'sans-serif' );
      expect( style.fontSize ).to.equal( '12px' );
      expect( style.fontStyle ).to.equal( 'italic' );
      expect( style.fontVariant ).to.equal( 'small-caps' );
      expect( style.fontWeight ).to.equal( 'bold' );
      expect( style.fontStretch ).to.equal( 'ultra-condensed' );
      expect( style.letterSpacing ).to.equal( '2px' );
      expect( style.wordSpacing ).to.equal( '3px' );
      expect( style.textDecoration ).to.equal( 'line-through' );
      expect( style.pointerEvents ).to.equal( 'fill' );
      expect( style.cursor ).to.equal( 'pointer' );
    } );

    it( 'should not change values in target style if they have already been set', (): void => {
      // Arrange
      const targetStyle = new GraphicStyle( 'red', 0.9, 'evenodd', 'yellow', 6, 0.8, 'square',
        'bevel', 4, '1,2,3', 10, 'non-scaling-stroke', 'block', 'hidden', 0.7, 'normal',
        'url(#mask)', 'sans-serif', '12px', 'italic', 'small-caps', 'bold', 'ultra-condensed',
        '2px', '3px', 'line-through', 'fill', 'pointer' );
      const sourceStyle = new GraphicStyle( 'black', undefined, undefined, 'blue', 2 );

      // Act
      targetStyle.complementWith( sourceStyle );

      // Assert
      expect( targetStyle.fill ).to.equal( 'red' );
      expect( targetStyle.stroke ).to.equal( 'yellow' );
      expect( targetStyle.strokeWidth ).to.equal( 6 );
    } );

    it( 'should copy those values that have not been set already', (): void => {
      // Arrange
      const targetStyle = new GraphicStyle( 'red', undefined, undefined, undefined, 6 );
      const sourceStyle = new GraphicStyle( 'black', 0.5, undefined, 'blue', 2 );

      // Act
      targetStyle.complementWith( sourceStyle );

      // Assert
      expect( targetStyle.fill ).to.equal( 'red' );
      expect( targetStyle.fillOpacity ).to.equal( 0.5 );
      expect( targetStyle.stroke ).to.equal( 'blue' );
      expect( targetStyle.strokeWidth ).to.equal( 6 );
    } );
  } );

  describe( 'printStyle', (): void => {
    it( 'should return the style declaration as string', (): void => {
      // Arrange
      const style = new GraphicStyle( 'black', 0.9, 'evenodd', 'blue', 2, 0.8, 'square',
        'bevel', 4, '1,2,3', 10, 'non-scaling-stroke', 'block', 'hidden', 0.7, 'normal',
        'url(#mask)', 'sans-serif', '12px', 'italic', 'small-caps', 'bold', 'ultra-condensed',
        '2px', '3px', 'line-through', 'fill', 'pointer' );

      // Act
      const text = style.printStyle();

      // Assert
      expect( text ).to.equal(
`fill: black; fill-opacity: 0.9; fill-rule: evenodd; stroke: blue; stroke-width: 2; \
stroke-opacity: 0.8; stroke-linecap: square; stroke-linejoin: bevel; stroke-miterlimit: 4; \
stroke-dasharray: 1,2,3; stroke-dashoffset: 10; vector-effect: non-scaling-stroke; display: block; \
visibility: hidden; opacity: 0.7; paint-order: normal; mask: url(#mask); font-family: sans-serif; \
font-size: 12px; font-style: italic; font-variant: small-caps; font-weight: bold; \
font-stretch: ultra-condensed; letter-spacing: 2px; word-spacing: 3px; \
text-decoration: line-through; pointer-events: fill; cursor: pointer`
      );
    } );

    it( 'should return empty string for empty style', (): void => {
      // Arrange
      const style = new GraphicStyle();

      // Act
      const text = style.printStyle();

      // Assert
      expect( text ).to.equal( '' );
    } );
  } );
} );
