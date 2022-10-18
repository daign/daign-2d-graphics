import { StyledGraphicNode } from '../styledGraphicNode';
import { TwoPointRectangle } from '../basic-elements';

import { ControlObject } from './controlObject';
import { IControlGuide } from './iControlGuide';

/**
 * Control guide for drawing a frame around the active object on the control layer.
 */
export class SelectionFrame implements IControlGuide {
  /**
   * Constructor.
   */
  public constructor() {}

  /**
   * Create the shapes that make up the control guide.
   * @param activeObject - The currently active control object.
   */
  public redraw( activeObject: ControlObject ): StyledGraphicNode {
    /* The transformation that converts from the coordinate system of the control object to view
     * coordinates. */
    const transformation = activeObject.presentationNodes[ 0 ].projectNodeToView;

    // The bounding box of the active element, transformed to view coordinates.
    const box = activeObject.getBox();
    const start = box.min.clone().transform( transformation );
    const end = box.max.clone().transform( transformation );

    // Create the basic shape of the frame.
    const frame = new TwoPointRectangle();
    frame.addClass( 'selection-frame' );
    frame.start = start;
    frame.end = end;

    return frame;
  }
}
