import { expect } from 'chai';

import { Matrix3, Vector2 } from '@daign/math';
import { View } from '@daign/2d-pipeline';

import { Application, ControlObject, ControlPoint, RoundingModifier } from '../../lib';
import { TestContext } from '../testContext';

class TestObject extends ControlObject {
  public constructor() {
    super();
  }
  public redraw(): void {}
}

describe( 'ControlPoint', (): void => {
  describe( 'constructor', (): void => {
    it( 'should set the center from the transformed target point', (): void => {
      // Arrange
      const context = new TestContext();
      const targetPoint = new Vector2( 1, 2 );
      const targetTransformation = new Matrix3().setTranslation( new Vector2( 2, 3 ) );
      const application = new Application( context );
      const controlObject = new TestObject();

      // Act
      const controlPoint = new ControlPoint( targetPoint, targetTransformation, application,
        controlObject, 0 );

      // Assert
      expect( controlPoint.center.equals( new Vector2( 3, 5 ) ) ).to.be.true;
    } );
  } );

  describe( 'snap', (): void => {
    it( 'should save a snapshot of the current center', (): void => {
      // Arrange
      const context = new TestContext();
      const targetPoint = new Vector2( 1, 2 );
      const targetTransformation = new Matrix3().setTranslation( new Vector2( 2, 3 ) );
      const application = new Application( context );
      const controlObject = new TestObject();
      const controlPoint = new ControlPoint( targetPoint, targetTransformation, application,
        controlObject, 0 );
      expect( controlPoint.center.equals( new Vector2( 3, 5 ) ) ).to.be.true;

      // Act
      controlPoint.snap();

      // Assert
      expect( controlPoint.center.snapshot!.equals( new Vector2( 3, 5 ) ) ).to.be.true;
    } );
  } );

  describe( 'drag', (): void => {
    it( 'should apply the translation delta to the last snapshot of the center', (): void => {
      // Arrange
      const context = new TestContext();
      const application = new Application( context );

      const view = new View();
      view.mountNode( application );

      const targetPoint = new Vector2( 1, 2 );

      const controlObject = new TestObject();
      controlObject.points.push( targetPoint );
      application.drawingLayer.appendChild( controlObject );

      const targetTransformation = new Matrix3().setIdentity();
      const controlPoint = new ControlPoint( targetPoint, targetTransformation, application,
        controlObject, 0 );

      expect( controlPoint.center.equals( targetPoint ) ).to.be.true;
      controlPoint.snap();

      // Act
      // First drag does not influence the final position, because snapshot remains the same.
      controlPoint.drag( new Vector2( 1, 1 ) );
      controlPoint.drag( new Vector2( 2, 3 ) );

      // Assert
      expect( controlPoint.center.equals( new Vector2( 3, 5 ) ) ).to.be.true;
      expect( controlObject.points.getElement( 0 )!.equals( new Vector2( 3, 5 ) ) ).to.be.true;
    } );

    it( 'should apply a control modifier when the point is dragged', (): void => {
      // Arrange
      const context = new TestContext();
      const application = new Application( context );

      const view = new View();
      view.mountNode( application );

      const targetPoint = new Vector2( 1, 2 );

      const modifier = new RoundingModifier();

      const controlObject = new TestObject();
      controlObject.controlModifier = modifier;
      controlObject.points.push( targetPoint );
      application.drawingLayer.appendChild( controlObject );

      const targetTransformation = new Matrix3().setIdentity();
      const controlPoint = new ControlPoint( targetPoint, targetTransformation, application,
        controlObject, 0 );

      expect( controlPoint.center.equals( targetPoint ) ).to.be.true;
      controlPoint.snap();

      // Act
      // First drag does not influence the final position, because snapshot remains the same.
      controlPoint.drag( new Vector2( 1, 1 ) );
      controlPoint.drag( new Vector2( 2.1, 3.5 ) );

      // Assert
      // The control point is not rounded, but the point applied back to the control object is.
      expect( controlPoint.center.equals( new Vector2( 3.1, 5.5 ) ) ).to.be.true;
      expect( controlObject.points.getElement( 0 )!.equals( new Vector2( 3, 6 ) ) ).to.be.true;
    } );
  } );
} );
