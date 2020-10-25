import { Vector2, Matrix3 } from '@daign/math';

import { FixedRadiusCircle } from '../basic-elements/fixedRadiusCircle';
import { Application } from './application';
import { ControlObject } from './controlObject';

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

  /**
   * Constructor.
   * @param targetPoint - The point coordinates to display and modify.
   * @param targetTransformation - The transformation matrix of the control object.
   * @param application - The corresponding application.
   * @param controlObject - The corresponding control object.
   */
  public constructor(
    targetPoint: Vector2, targetTransformation: Matrix3, application: Application,
    controlObject: ControlObject
  ) {
    super();
    this.radius = 15;

    this.targetPoint = targetPoint;
    this.targetTransformation = targetTransformation;
    this.application = application;
    this.controlObject = controlObject;

    this.center = this.targetPoint.clone().transform( this.targetTransformation );
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
    this.center.drag( delta );
    // TODO Get the correct presentation node that corresponds to the application's view.
    const presentationNode = this.controlObject.presentationNodes[ 0 ];

    this.targetPoint.copy( this.center ).transform( presentationNode.projectViewToNode );

    this.application.controlLayer.createControls();
    this.application.drawingLayer.redrawObservable.notify();
  }
}
