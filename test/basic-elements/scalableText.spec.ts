import { expect } from 'chai';

import { Matrix3, Vector2 } from '@daign/math';

import { ScalableText } from '../../lib';

describe( 'ScalableText', (): void => {
  describe( 'get anchor', (): void => {
    it( 'should return the anchor position', (): void => {
      // Arrange
      const point = new Vector2( 1, 2 );
      const text = new ScalableText();
      text.points.getElement( 0 )!.copy( point );

      // Act
      const result = text.anchor;

      // Assert
      expect( result.equals( point ) ).to.be.true;
    } );
  } );

  describe( 'set anchor', (): void => {
    it( 'should set the anchor position', (): void => {
      // Arrange
      const point = new Vector2( 1, 2 );
      const text = new ScalableText();

      // Act
      text.anchor = point;

      // Assert
      expect( text.points.getElement( 0 )!.equals( point ) ).to.be.true;
    } );
  } );

  describe( 'get heightPoint', (): void => {
    it( 'should return the second point', (): void => {
      // Arrange
      const point = new Vector2( 1, 2 );
      const text = new ScalableText();
      text.points.getElement( 1 )!.copy( point );

      // Act
      const result = text.heightPoint;

      // Assert
      expect( result.equals( point ) ).to.be.true;
    } );
  } );

  describe( 'set font size', (): void => {
    it( 'should set the font size and height point', (): void => {
      // Arrange
      const anchor = new Vector2( 1, 2 );
      const text = new ScalableText();
      text.anchor = anchor;

      // Act
      text.fontSize = 10;

      // Assert
      const expectedHeightPoint = new Vector2( 1, -8 );
      expect( text.fontSize ).to.equal( 10 );
      expect( text.points.getElement( 1 )!.equals( expectedHeightPoint ) ).to.be.true;
    } );
  } );

  describe( 'get font size', (): void => {
    it( 'should return the font size', (): void => {
      // Arrange
      const text = new ScalableText();
      text.fontSize = 10;

      // Act
      const result = text.fontSize;

      // Assert
      expect( result ).to.equal( 10 );
    } );
  } );

  describe( 'constructor', (): void => {
    it( 'should initialize with two points', (): void => {
      // Act
      const text = new ScalableText();

      // Assert
      expect( text.points.length ).to.equal( 2 );
      expect( text.points.containsName( 'anchor' ) ).to.be.true;
      expect( text.points.containsName( 'heightPoint' ) ).to.be.true;
    } );
  } );

  describe( 'getFontSizeTransformed', (): void => {
    it( 'should return the transformed font size', (): void => {
      // Arrange
      const text = new ScalableText();
      text.anchor = new Vector2( 1, 2 );
      text.fontSize = 10;
      const transformation = new Matrix3().setScaling( new Vector2( 2, 2 ) );

      // Act
      const fontSize = text.getFontSizeTransformed( transformation );

      // Assert
      expect( fontSize ).to.equal( 20 );
    } );
  } );

  describe( 'getAnchorTransformed', (): void => {
    it( 'should return the transformed anchor', (): void => {
      // Arrange
      const text = new ScalableText();
      text.anchor = new Vector2( 1, 2 );
      const transformation = new Matrix3().setScaling( new Vector2( 2, 2 ) );

      // Act
      const anchor = text.getAnchorTransformed( transformation );

      // Assert
      expect( anchor.equals( new Vector2( 2, 4 ) ) ).to.be.true;
    } );
  } );

  describe( 'getBox', (): void => {
    it( 'should get the bounding box of the text', (): void => {
      // Arrange
      const text = new ScalableText();
      text.anchor = new Vector2( 1, 2 );
      text.fontSize = 10;

      // Without text anchor defined the content is ignored.
      text.textAnchor = '';
      text.content = 'ABCDEF';

      // Act
      const box = text.getBox();

      // Assert
      expect( box.min.equals( new Vector2( 1, -8 ) ) ).to.be.true;
      expect( box.max.equals( new Vector2( 1, 2 ) ) ).to.be.true;
    } );

    it( 'should get the estimated bounding box for end aligned text', (): void => {
      // Arrange
      const text = new ScalableText();
      text.anchor = new Vector2( 1, 2 );
      text.fontSize = 10;
      text.textAnchor = 'end';
      text.content = 'ABCDEF';

      // Act
      const box = text.getBox();

      // Assert
      expect( box.min.equals( new Vector2( -29, -8 ) ) ).to.be.true;
      expect( box.max.equals( new Vector2( 1, 2 ) ) ).to.be.true;
    } );

    it( 'should get the estimated bounding box for start aligned text', (): void => {
      // Arrange
      const text = new ScalableText();
      text.anchor = new Vector2( 1, 2 );
      text.fontSize = 10;
      text.textAnchor = 'start';
      text.content = 'ABCDEF';

      // Act
      const box = text.getBox();

      // Assert
      expect( box.min.equals( new Vector2( 1, -8 ) ) ).to.be.true;
      expect( box.max.equals( new Vector2( 31, 2 ) ) ).to.be.true;
    } );

    it( 'should get the estimated bounding box for middle aligned text', (): void => {
      // Arrange
      const text = new ScalableText();
      text.anchor = new Vector2( 1, 2 );
      text.fontSize = 10;
      text.textAnchor = 'middle';
      text.content = 'ABCDEF';

      // Act
      const box = text.getBox();

      // Assert
      expect( box.min.equals( new Vector2( -14, -8 ) ) ).to.be.true;
      expect( box.max.equals( new Vector2( 16, 2 ) ) ).to.be.true;
    } );
  } );
} );
