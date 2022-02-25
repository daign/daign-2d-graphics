import { expect } from 'chai';

import { Matrix3, Vector2 } from '@daign/math';

import { SinglePointElement } from '../../lib';

export class TestClass extends SinglePointElement {
  public constructor() {
    super();
  }
}

describe( 'SinglePointElement', (): void => {
  describe( 'getter and setter anchor', (): void => {
    it( 'should set and get the anchor position', (): void => {
      // Arrange
      const vector = new Vector2( 1, 1 );
      const element = new TestClass();

      // Act and assert
      element.anchor = vector;
      expect( element.anchor.equals( vector ) ).to.be.true;
    } );
  } );

  describe( 'constructor', (): void => {
    it( 'should initialize with one point', (): void => {
      // Act
      const element = new TestClass();

      // Assert
      expect( element.points.length ).to.equal( 1 );
      expect( element.points.containsName( 'anchor' ) ).to.be.true;
    } );
  } );

  describe( 'getAnchorTransformed', (): void => {
    it( 'should return the transformed anchor', (): void => {
      // Arrange
      const element = new TestClass();
      element.anchor = new Vector2( 1, 1 );
      const transformation = new Matrix3().setScaling( new Vector2( 2, 2 ) );

      // Act
      const anchor = element.getAnchorTransformed( transformation );

      // Assert
      expect( anchor.equals( new Vector2( 2, 2 ) ) ).to.be.true;
    } );
  } );
} );
