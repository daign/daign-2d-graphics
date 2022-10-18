import { Vector2 } from '@daign/math';

import { StyledGraphicNode } from '../styledGraphicNode';
import { Application } from '../application';
import { Group } from '../basic-elements';
import { IControlModifier } from '../control-modifiers';

import { ButtonControl } from './buttonControl';
import { ButtonObject } from './buttonObject';
import { ControlPoint } from './controlPoint';
import { IControlGuide } from './iControlGuide';

/**
 * Abstract class for drawing elements that are defined by interactive control points.
 */
export abstract class ControlObject extends Group {
  // Modifiers that restrict drawing actions.
  public controlModifier: IControlModifier | null = null;

  // Array of control guide objects for displaying custom drawing elements on the control layer.
  public controlGuides: IControlGuide[] = [];

  // Array of custom shapes to be used for control points.
  public controlPointShapes: ( StyledGraphicNode | null )[] = [];

  // Array of button objects.
  public buttons: ButtonObject[] = [];

  /**
   * Constructor.
   */
  public constructor() {
    super();

    this.redraw();

    // Redraw method is automatically called when the points array changes.
    this.points.subscribeToChanges( (): void => {
      this.redraw();
    } );
  }

  /**
   * The redraw method to extend which should create the shape of the element.
   */
  public redraw(): void {
    this.clearChildren();
    this.buttons = [];
  };

  /**
   * Construct the shapes to be displayed on the control layer.
   * @param activePoint - The selected point of the active object.
   * @param application - The corresponding application.
   * @returns A node containing the content for the control layer.
   */
  public redrawControlObjects(
    activePoint: Vector2 | null,
    application: Application
  ): StyledGraphicNode {
    const group = new Group();

    /* TODO: To enable simultaneous rendering into multiple views get the correct presentation node
     *   that corresponds to the application's view. */
    const transformation = this.presentationNodes[ 0 ].projectNodeToView;

    // Add the control guide objects.
    this.controlGuides.forEach( ( controlGuide: IControlGuide ): void => {
      const node = controlGuide.redraw( this, activePoint );
      group.appendChild( node );
    } );

    // Add the control points.
    this.points.iterate( ( point: Vector2, index: number ): void => {
      const controlPoint = new ControlPoint( point, transformation, application, this, index,
        this.controlPointShapes[ index ] );
      group.appendChild( controlPoint );

      if ( point === activePoint ) {
        controlPoint.addClass( 'active' );
      }
    } );

    // Add the button controls.
    this.buttons.forEach( ( button: ButtonObject ): void => {
      const buttonControl = new ButtonControl( button, transformation, application );
      group.appendChild( buttonControl );
    } );

    return group;
  }
}
