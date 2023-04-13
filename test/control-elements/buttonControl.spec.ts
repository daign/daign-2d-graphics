import { expect } from 'chai';
import * as sinon from 'sinon';

import { Matrix3, Vector2 } from '@daign/math';

import { ButtonControl, ButtonObject, FixedRadiusCircle, TwoPointRectangle } from '../../lib';

describe( 'ButtonControl', (): void => {
  describe( 'constructor', (): void => {
    it( 'should set the transformation from the transformed button object anchor', (): void => {
      // Arrange
      const anchorPoint = new Vector2( 1, 2 );
      const callback = (): void => {};
      const buttonObject = new ButtonObject( callback );
      buttonObject.anchor = anchorPoint;

      const targetTransformation = new Matrix3().setTranslation( new Vector2( 2, 3 ) );

      // Act
      const buttonControl = new ButtonControl( buttonObject, targetTransformation );

      // Assert
      const expected = new Matrix3().setTranslation( new Vector2( 3, 5 ) );
      const transformation = buttonControl.transformation.transformMatrix;
      expect( transformation.equals( expected ) ).to.be.true;
    } );

    it( 'should add the contained button shape', (): void => {
      // Arrange
      const anchorPoint = new Vector2( 1, 2 );
      const buttonShape = new TwoPointRectangle();
      const callback = (): void => {};
      const buttonObject = new ButtonObject( callback );
      buttonObject.anchor = anchorPoint;
      buttonObject.buttonShape = buttonShape;

      const targetTransformation = new Matrix3().setIdentity();

      // Act
      const buttonControl = new ButtonControl( buttonObject, targetTransformation );

      // Assert
      expect( buttonControl.children.length ).to.equal( 1 );
      expect( buttonControl.children[ 0 ] instanceof TwoPointRectangle ).to.be.true;
      expect( buttonControl.children[ 0 ] ).to.equal( buttonShape );
    } );

    it( 'should add a default shape when no button shape is defined', (): void => {
      // Arrange
      const anchorPoint = new Vector2( 1, 2 );
      const callback = (): void => {};
      const buttonObject = new ButtonObject( callback );
      buttonObject.anchor = anchorPoint;

      const targetTransformation = new Matrix3().setIdentity();

      // Act
      const buttonControl = new ButtonControl( buttonObject, targetTransformation );

      // Assert
      expect( buttonControl.children.length ).to.equal( 1 );
      expect( buttonControl.children[ 0 ] instanceof FixedRadiusCircle ).to.be.true;
      expect( ( buttonControl.children[ 0 ] as FixedRadiusCircle ).radius ).to.equal( 15 );
    } );
  } );

  describe( 'click', (): void => {
    it( 'should call the callback function', (): void => {
      // Arrange
      const anchorPoint = new Vector2( 1, 2 );
      const callbackSpy = sinon.spy();
      const buttonObject = new ButtonObject( callbackSpy );
      buttonObject.anchor = anchorPoint;

      const targetTransformation = new Matrix3().setTranslation( new Vector2( 2, 3 ) );

      const buttonControl = new ButtonControl( buttonObject, targetTransformation );

      // Act
      buttonControl.click();

      // Assert
      expect( callbackSpy.calledOnce ).to.be.true;
    } );
  } );
} );
