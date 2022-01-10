import { Vector2, Matrix3 } from '@daign/math';

import { FixedRadiusCircle } from '../basic-elements/fixedRadiusCircle';
import { ControlObject } from '../control-objects/controlObject';

import { Application } from './application';

/**
 * Interactive control point for control objects.
 */
export class ControlPoint extends FixedRadiusCircle {
  // The point coordinates to display and modify.
  private targetPoint: Vector2;

  // The transformation matrix of the control object.
  private targetTransformation: Matrix3;

  // The corresponding application.
  private application: Application;

  // The corresponding control object.
  private controlObject: ControlObject;

  // The index of the point in the points array of the control object.
  private controlIndex: number;

  /**
   * Constructor.
   * @param targetPoint - The point coordinates to display and modify.
   * @param targetTransformation - The transformation matrix of the control object.
   * @param application - The corresponding application.
   * @param controlObject - The corresponding control object.
   * @param controlIndex - The index of the point in the points array of the control object.
   */
  public constructor(
    targetPoint: Vector2, targetTransformation: Matrix3, application: Application,
    controlObject: ControlObject, controlIndex: number
  ) {
    super();
    this.radius = 15;

    this.targetPoint = targetPoint;
    this.targetTransformation = targetTransformation;
    this.application = application;
    this.controlObject = controlObject;
    this.controlIndex = controlIndex;

    this.center = this.targetPoint.clone().transform( this.targetTransformation );

    this.baseClass = 'controlPoint';
  }

  /**
   * Save a snapshot copy of the current center position.
   */
  public snap(): void {
    this.center.snap();
  }

  /**
   * Apply a translation delta to the last snapshot of the center.
   * @param delta - The translation delta.
   */
  public drag( delta: Vector2 ): void {
    // Apply the translation to the last snapshot of the center.
    this.center.drag( delta );

    // TODO Get the correct presentation node that corresponds to the application's view.
    const presentationNode = this.controlObject.presentationNodes[ 0 ];

    // Calculate the real world coordinates from the screen coordinates of the control point.
    const calculatedPosition = this.center.clone().transform( presentationNode.projectViewToNode );

    // Create copy of all points of the control object and set the calculated position.
    let updatedPoints = this.controlObject.points.cloneDeep().elements;
    updatedPoints[ this.controlIndex ].copy( calculatedPosition );

    // If a control modifier exists, then modify the points through it.
    if ( this.controlObject.controlModifier ) {
      updatedPoints = this.controlObject.controlModifier.modifyPoints( updatedPoints,
        this.controlIndex, this.controlObject );
    }

    // Copy all coordinates back to the control object.
    this.controlObject.points.iterate( ( element: Vector2, index: number ): void => {
      element.copy( updatedPoints[ index ] );
    } );

    this.application.createControls();
    this.application.drawingLayer.redrawObservable.notify();
  }
}
