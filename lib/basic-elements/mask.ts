import { Box2 } from '@daign/math';
import { GraphicNode } from '@daign/2d-pipeline';

import { StyledGraphicNode } from '../styledGraphicNode';

/**
 * Class for a mask element.
 */
export class Mask extends StyledGraphicNode {
  // The id of the mask.
  public id: string = '';

  /**
   * Constructor.
   */
  public constructor() {
    super();

    this.baseClass = 'mask';
  }

  /**
   * Get the bounding box of all child elements of the mask.
   * @returns The bounding box.
   */
  public getBox(): Box2 {
    const box = new Box2();
    this.children.forEach( ( child: GraphicNode ): void => {
      if ( child instanceof StyledGraphicNode ) {
        box.expandByBox( child.getBoxTransformed() );
      }
    } );
    return box;
  }
}
