import { View } from '@daign/2d-pipeline';
import { Application } from './application';

/**
 * Extension of View class that saves a reference to its corresponding application.
 */
export class ApplicationView extends View {
  // The corresponding application.
  public application: Application;

  /**
   * Constructor.
   * @param application - The corresponding application.
   */
  public constructor( application: Application ) {
    super();
    this.application = application;
  }
}
