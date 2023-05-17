import { EventEmitter, UnicastEventEmitter } from '@daign/observable';

/**
 * Class that manages the steps to update and redraw the graphic.
 */
export class UpdateManager {
  // Incoming signal to run the update and redraw cycle.
  public redrawSignal: UnicastEventEmitter = new UnicastEventEmitter();

  // Components that want to update when the graphic was changed subscribe to this event.
  public graphicUpdateEvent: EventEmitter = new EventEmitter();

  // The control layer subscribes to this event to know when to redraw the controls.
  public redrawControlsSignal: UnicastEventEmitter = new UnicastEventEmitter();

  // Subscribe your render function to this event.
  public renderSignal: UnicastEventEmitter = new UnicastEventEmitter();

  /**
   * Constructor.
   */
  public constructor() {
    // Run the update and redraw cycle on incoming signal.
    this.redrawSignal.setObserver( (): void => {
      // Notify components that want to update when the graphic was changed.
      this.graphicUpdateEvent.emit();

      // Redraw the controls.
      this.redrawControlsSignal.emit();

      // Render the graphic.
      this.renderSignal.emit();
    } );
  }
}
