import { Group } from '../basic-elements/group';
import { ITargetContext } from '../iTargetContext';

import { ControlLayer } from './controlLayer';
import { InteractiveViewport } from './interactiveViewport';
import { SelectionManager } from './selectionManager';
import { Viewport } from './viewport';
import { UpdateManager } from './updateManager';

/**
 * Application consisting of a drawing layer and a control layer.
 */
export class Application extends Group {
  // The selection manager.
  public selectionManager: SelectionManager;

  // The update manager.
  public updateManager: UpdateManager;

  // The drawing layer and interactive viewport.
  public drawingLayer: Viewport;

  /* The control layer. It lies above the drawing layer and is not affected by zooming and panning
   * of the viewport. So its coordinates are always in screen coordinates. */
  public controlLayer: ControlLayer | null = null;

  /**
   * Constructor.
   * @param context - The target context.
   * @param interactive - Whether the application is responding to user actions. Default false.
   */
  public constructor( context: ITargetContext, interactive: boolean = false ) {
    super();

    this.selectionManager = new SelectionManager();
    this.updateManager = new UpdateManager();

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
}
