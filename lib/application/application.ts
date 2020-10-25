import { Group } from '../basic-elements/group';
import { ITargetContext } from '../iTargetContext';

import { ControlLayer } from './controlLayer';
import { ControlObject } from './controlObject';
import { InteractiveViewport } from './interactiveViewport';

/**
 * Application consisting of a drawing layer and a control layer.
 */
export class Application extends Group {
  // The control layer.
  public controlLayer: ControlLayer;

  // The drawing layer and interactive viewport.
  public drawingLayer: InteractiveViewport;

  /**
   * Constructor.
   * @param context - The target context.
   */
  public constructor( context: ITargetContext ) {
    super();

    this.drawingLayer = new InteractiveViewport( context, this );
    this.appendChild( this.drawingLayer );

    this.controlLayer = new ControlLayer( this );
    this.appendChild( this.controlLayer );
  }

  /**
   * Zoom and pan content to fit viewport.
   */
  public fitToContent(): void {
    this.drawingLayer.fitToContent();
  }

  /**
   * Activate a control object.
   * @param controlObject - The control object to activate.
   */
  public activateElement( controlObject: ControlObject ): void {
    this.controlLayer.activateElement( controlObject );
    this.drawingLayer.redrawObservable.notify();
  }
}
