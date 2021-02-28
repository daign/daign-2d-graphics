import { Group } from '../basic-elements/group';
import { ITargetContext } from '../iTargetContext';

import { ControlLayer } from './controlLayer';
import { ControlObject } from './controlObject';
import { InteractiveViewport } from './interactiveViewport';
import { Viewport } from './viewport';

/**
 * Application consisting of a drawing layer and a control layer.
 */
export class Application extends Group {
  // The control layer.
  public controlLayer: ControlLayer | null = null;

  // The drawing layer and interactive viewport.
  public drawingLayer: Viewport;

  /**
   * Constructor.
   * @param context - The target context.
   * @param interactive - Whether the application is responding to user actions. Default false.
   */
  public constructor( context: ITargetContext, interactive: boolean = false ) {
    super();

    if ( interactive ) {
      // If interactive then use the InteractiveViewPort and ControlLayer.
      this.drawingLayer = new InteractiveViewport( context, this );
      this.appendChild( this.drawingLayer );
      this.controlLayer = new ControlLayer( this );
      this.appendChild( this.controlLayer );
    } else {
      // If not interactive then use the normal Viewport and no ControlLayer.
      this.drawingLayer = new Viewport( context, this );
      this.appendChild( this.drawingLayer );
    }
  }

  /**
   * Zoom and pan content to fit viewport.
   * @param margin - The margin to leave around the content. Optional.
   */
  public fitToContent( margin?: number ): void {
    this.drawingLayer.fitToContent( margin );
  }

  /**
   * Activate a control object.
   * @param controlObject - The control object to activate.
   */
  public activateElement( controlObject: ControlObject ): void {
    if ( this.controlLayer ) {
      this.controlLayer.activateElement( controlObject );
      this.drawingLayer.redrawObservable.notify();
    }
  }

  /**
   * Deactivate the currently activated control object.
   */
  public deactivateElement(): void {
    if ( this.controlLayer ) {
      this.controlLayer.deactivateElement();
    }
  }

  /**
   * Create the control elements for the active control object.
   */
  public createControls(): void {
    if ( this.controlLayer ) {
      this.controlLayer.createControls();
    }
  }
}
