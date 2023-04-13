import { Observable } from '@daign/observable';

import { SelectionManager } from './selectionManager';
import { ControlLayer } from './controlLayer';
import { Viewport } from './viewport';

// Observable implementation with a public invoke method.
class EventSource extends Observable {
  public constructor() {
    super();
  }
  public invoke(): void {
    this.notifyObservers();
  }
}

/**
 * Class that manages update and change notifications between components.
 */
export class UpdateManager {
  // Subscribe to know when the graphic data has changes.
  public dataChangeEvent: EventSource = new EventSource();

  // Subscribe to know when the selection changes.
  public selectionChangeEvent: EventSource = new EventSource();

  // Subscribe to know when the graphic needs to be redrawn.
  public redrawEvent: EventSource = new EventSource();

  // Subscribe to know when the viewport has changed.
  public viewportInputEvent: EventSource = new EventSource();

  /**
   * Constructor.
   * @param selectionManager - The selection manager.
   * @param controlLayer - The control layer.
   * @param drawingLayer - The drawing layer.
   */
  public constructor(
    private selectionManager: SelectionManager,
    private controlLayer: ControlLayer | null,
    private drawingLayer: Viewport
  ) {
    // Actions to take when the selection manager has changes.
    this.selectionManager.subscribeToChanges( (): void => {
      this.selectionChangeEvent.invoke();
      this.createControls();
      this.redrawEvent.invoke();
    } );

    // Actions to take when the drawing layer has changes.
    this.drawingLayer.subscribeToChanges( (): void => {
      this.dataChangeEvent.invoke();
      this.createControls();
      this.redrawEvent.invoke();
    } );

    // Actions to take when the viewport has changed.
    this.viewportInputEvent.subscribeToChanges( (): void => {
      this.createControls();
      this.redrawEvent.invoke();
    } );
  }

  /**
   * Let the control layer create the controls for the currently selected object.
   */
  public createControls(): void {
    if ( this.controlLayer ) {
      this.controlLayer.createControls();
    }
  }
}
