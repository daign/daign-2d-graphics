import { expect } from 'chai';

import { Matrix3, Vector2 } from '@daign/math';
import { View } from '@daign/2d-pipeline';

import { Application, ControlObject, ControlPoint, FixedRadiusCircle, RoundingModifier,
  TwoPointRectangle } from '../../lib';
import { TestContext } from '../testContext';

class TestObject extends ControlObject {
  public constructor() {
    super();
  }
  public redraw(): void {}
}

describe( 'ControlPoint', (): void => {
  describe( 'getter and setter center', (): void => {
    it( 'should set and get the center position', (): void => {
      // Arrange
      const context = new TestContext();
      const targetPoint = new Vector2( 1, 2 );
      const targetTransformation = new Matrix3().setTranslation( new Vector2( 2, 3 ) );
      const application = new Application( context );
      const controlObject = new TestObject();
      const controlPoint = new ControlPoint( targetPoint, targetTransformation, application,
        controlObject, 2 );

      // Act and assert
      const vector = new Vector2( 1, 1 );
      controlPoint.center = vector;
      expect( controlPoint.center.equals( vector ) ).to.be.true;
    } );

    it( 'should update the offset transformation', (): void => {
      // Arrange
      const context = new TestContext();
      const targetPoint = new Vector2( 1, 2 );
      const targetTransformation = new Matrix3().setTranslation( new Vector2( 2, 3 ) );
      const application = new Application( context );
      const controlObject = new TestObject();
      const controlPoint = new ControlPoint( targetPoint, targetTransformation, application,
        controlObject, 2 );

      // Act
      const vector = new Vector2( 1, 1 );
      controlPoint.center = vector;

      // Assert
      const expected = new Matrix3().setTranslation( vector );
      expect( ( controlPoint as any ).offset.matrix.equals( expected ) ).to.be.true;
    } );
  } );

  describe( 'constructor', (): void => {
    it( 'should initialize with one point', (): void => {
      // Arrange
      const context = new TestContext();
      const targetPoint = new Vector2( 1, 2 );
      const targetTransformation = new Matrix3().setTranslation( new Vector2( 2, 3 ) );
      const application = new Application( context );
      const controlObject = new TestObject();

      // Act
      const controlPoint = new ControlPoint( targetPoint, targetTransformation, application,
        controlObject, 2 );

      // Assert
      expect( controlPoint.points.length ).to.equal( 1 );
      expect( controlPoint.points.containsName( 'center' ) ).to.be.true;
    } );

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

    it( 'should append the given control shape', (): void => {
      // Arrange
      const context = new TestContext();
      const targetPoint = new Vector2( 1, 2 );
      const targetTransformation = new Matrix3().setTranslation( new Vector2( 2, 3 ) );
      const application = new Application( context );
      const controlObject = new TestObject();

      const controlShape = new TwoPointRectangle();

      // Act
      const controlPoint = new ControlPoint( targetPoint, targetTransformation, application,
        controlObject, 0, controlShape );

      // Assert
      expect( controlPoint.children.length ).to.equal( 1 );
      expect( controlPoint.children[ 0 ] instanceof TwoPointRectangle ).to.be.true;
      expect( controlPoint.children[ 0 ] ).to.equal( controlShape );
    } );

    it( 'should append a default shape when no control shape is passed', (): void => {
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
      expect( controlPoint.children.length ).to.equal( 1 );
      expect( controlPoint.children[ 0 ] instanceof FixedRadiusCircle ).to.be.true;
      expect( ( controlPoint.children[ 0 ] as FixedRadiusCircle ).radius ).to.equal( 15 );
    } );

    it( 'should not append a shape when null is passed as control shape', (): void => {
      // Arrange
      const context = new TestContext();
      const targetPoint = new Vector2( 1, 2 );
      const targetTransformation = new Matrix3().setTranslation( new Vector2( 2, 3 ) );
      const application = new Application( context );
      const controlObject = new TestObject();

      // Act
      const controlPoint = new ControlPoint( targetPoint, targetTransformation, application,
        controlObject, 0, null );

      // Assert
      expect( controlPoint.children.length ).to.equal( 0 );
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
