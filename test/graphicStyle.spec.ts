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
      const style = new GraphicStyle( 'black', 'blue', 2, 1, '12px' );

      // Assert
      expect( style.fill ).to.equal( 'black' );
      expect( style.stroke ).to.equal( 'blue' );
      expect( style.strokeWidth ).to.equal( 2 );
      expect( style.opacity ).to.equal( 1 );
      expect( style.fontSize ).to.equal( '12px' );
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
      style.parseAttribute( 'stroke', 'blue' );
      style.parseAttribute( 'font-size', '12px' );

      // Assert
      expect( style.fill ).to.equal( 'black' );
      expect( style.stroke ).to.equal( 'blue' );
      expect( style.fontSize ).to.equal( '12px' );
    } );

    it( 'should parse float value properties', (): void => {
      // Arrange
      const style = new GraphicStyle();

      // Act
      style.parseAttribute( 'stroke-width', '1.2' );
      style.parseAttribute( 'opacity', '0.5' );

      // Assert
      expect( style.strokeWidth ).to.equal( 1.2 );
      expect( style.opacity ).to.equal( 0.5 );
    } );
  } );

  describe( 'complementWith', (): void => {
    it( 'should copy the values from the source style into an empty target style', (): void => {
      // Arrange
      const targetStyle = new GraphicStyle();
      const sourceStyle = new GraphicStyle( 'black', 'blue', 2, 1, '12px' );

      // Act
      targetStyle.complementWith( sourceStyle );

      // Assert
      expect( targetStyle.fill ).to.equal( 'black' );
      expect( targetStyle.stroke ).to.equal( 'blue' );
      expect( targetStyle.strokeWidth ).to.equal( 2 );
      expect( targetStyle.opacity ).to.equal( 1 );
      expect( targetStyle.fontSize ).to.equal( '12px' );
    } );

    it( 'should not change values in target style if they have already been set', (): void => {
      // Arrange
      const targetStyle = new GraphicStyle( 'red', 'yellow', 6, 7, '24px' );
      const sourceStyle = new GraphicStyle( 'black', 'blue', 2, 1, '12px' );

      // Act
      targetStyle.complementWith( sourceStyle );

      // Assert
      expect( targetStyle.fill ).to.equal( 'red' );
      expect( targetStyle.stroke ).to.equal( 'yellow' );
      expect( targetStyle.strokeWidth ).to.equal( 6 );
      expect( targetStyle.opacity ).to.equal( 7 );
      expect( targetStyle.fontSize ).to.equal( '24px' );
    } );

    it( 'should copy those values that have not been set already', (): void => {
      // Arrange
      const targetStyle = new GraphicStyle( 'red', undefined, 6, undefined, '24px' );
      const sourceStyle = new GraphicStyle( 'black', 'blue', 2, 1, '12px' );

      // Act
      targetStyle.complementWith( sourceStyle );

      // Assert
      expect( targetStyle.fill ).to.equal( 'red' );
      expect( targetStyle.stroke ).to.equal( 'blue' );
      expect( targetStyle.strokeWidth ).to.equal( 6 );
      expect( targetStyle.opacity ).to.equal( 1 );
      expect( targetStyle.fontSize ).to.equal( '24px' );
    } );
  } );
} );
