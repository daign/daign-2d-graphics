import { Vector2, Matrix3 } from '@daign/math';
import { MatrixTransform } from '@daign/2d-pipeline';

import { Application } from '../application';
import { FixedRadiusCircle, Group } from '../basic-elements';
import { StyledGraphicNode } from '../styledGraphicNode';

import { ControlObject } from './controlObject';

/**
 * Interactive control point for control objects.
 */
export class ControlPoint extends Group {
  // The offset position that is applied to all elements of the control point.
  private offset: MatrixTransform = new MatrixTransform();

  /**
   * Getter for the center position.
   */
  public get center(): Vector2 {
    return this.points.getByName( 'center' );
  }

  /**
   * Setter for the center position.
   */
  public set center( position: Vector2 ) {
    this.points.getByName( 'center' ).copy( position );
    this.calculateOffset();
  }

  /**
   * Constructor.
   * @param targetPoint - The point coordinates to display and modify.
   * @param targetTransformation - The transformation matrix of the control object.
   * @param application - The corresponding application.
   * @param controlObject - The corresponding control object.
   * @param controlIndex - The index of the point in the points array of the control object.
   * @param controlShape - The shape to display for a control point. Optional.
   */
  public constructor(
    public readonly targetPoint: Vector2,
    private readonly targetTransformation: Matrix3,
    public readonly application: Application,
    public readonly controlObject: ControlObject,
    private controlIndex: number,
    controlShape?: StyledGraphicNode | null
  ) {
    super();

    this.baseClass = 'controlPoint';
    this.points.initializeElements( 1 );
    this.points.assignName( 'center', 0 );

    this.center = this.targetPoint.clone().transform( this.targetTransformation );
    this.transformation.push( this.offset );

    if ( controlShape ) {
      this.appendChild( controlShape );
    } else if ( controlShape === undefined ) {
      // The default shape to display for a control point.
      // Center is (0,0) because the whole group is shifted into position.
      const defaultShape = new FixedRadiusCircle();
      defaultShape.radius = 15;
      this.appendChild( defaultShape );
    }
    // Else if controlShape is null then don't add a shape.
  }

  /**
   * Calculate the offset transformation resulting from the center point position.
   */
  private calculateOffset(): void {
    this.offset.matrix.setTranslation( this.center );
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
    let updatedPoints = this.controlObject.getDeepCopyOfPoints();
    updatedPoints[ this.controlIndex ].copy( calculatedPosition );

    // If a control modifier exists, then modify the points through it.
    if ( this.controlObject.controlModifier ) {
      updatedPoints = this.controlObject.controlModifier.modifyPoints( updatedPoints,
        this.controlIndex, this.controlObject );
    }

    // Copy all coordinates back to the control object.
    this.controlObject.writeUpdatesToPoints( updatedPoints );

    this.calculateOffset();

    this.application.redraw();
  }
}
