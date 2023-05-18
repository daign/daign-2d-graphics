import { EventEmitter, UnicastEventEmitter } from '@daign/observable';

/**
 * Class that manages the steps to update and redraw the graphic.
 */
export class UpdateManager {
  // Event that other components can use to get informed about a redraw.
  private redrawEvent: EventEmitter = new EventEmitter();

  // The event that lets the control layer know when to redraw the controls.
  private redrawControlsSignal: UnicastEventEmitter = new UnicastEventEmitter();

  // The event that the render function subscribes to.
  private renderSignal: UnicastEventEmitter = new UnicastEventEmitter();

  /**
   * Constructor.
   */
  public constructor() {}

  /**
   * Set a callback that gets informed when a redraw event was started.
   * @param callback - The callback that will be called when a redraw event was started.
   */
  public subscribeToRedrawEvent( callback: () => void ): void {
    this.redrawEvent.subscribeToChanges( callback );
  }

  /**
   * Set the callback that redraws the control layer.
   * @param callback - The callback that redraws the control layer.
   */
  public setRedrawControlsFunction( callback: () => void ): void {
    this.redrawControlsSignal.setObserver( callback );
  }

  /**
   * Set the callback that renders the graphic.
   * @param callback - The callback that renders the graphic.
   */
  public setRenderFunction( callback: () => void ): void {
    this.renderSignal.setObserver( callback );
  }

  /**
   * Redraw and render the application.
   */
  public redraw(): void {
    // Notify components that want to be informed about a redraw event.
    this.redrawEvent.emit();

    // Redraw the controls.
    this.redrawControlsSignal.emit();

    // Render the graphic.
    this.renderSignal.emit();
  }
}
