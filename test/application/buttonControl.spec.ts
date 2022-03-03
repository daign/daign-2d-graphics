import { expect } from 'chai';
import * as sinon from 'sinon';

import { Matrix3, Vector2 } from '@daign/math';

import { Application, ButtonControl, ButtonObject } from '../../lib';
import { TestContext } from '../testContext';

describe( 'ButtonControl', (): void => {
  describe( 'constructor', (): void => {
    it( 'should set the center from the transformed button object anchor', (): void => {
      // Arrange
      const anchorPoint = new Vector2( 1, 2 );
      const callback = (): void => {};
      const buttonObject = new ButtonObject( callback );
      buttonObject.anchor = anchorPoint;

      const targetTransformation = new Matrix3().setTranslation( new Vector2( 2, 3 ) );
      const context = new TestContext();
      const application = new Application( context );

      // Act
      const buttonControl = new ButtonControl( buttonObject, targetTransformation, application );

      // Assert
      expect( buttonControl.center.equals( new Vector2( 3, 5 ) ) ).to.be.true;
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
      const context = new TestContext();
      const application = new Application( context );

      const buttonControl = new ButtonControl( buttonObject, targetTransformation, application );

      // Act
      buttonControl.click();

      // Assert
      expect( callbackSpy.calledOnce ).to.be.true;
    } );
  } );
} );
