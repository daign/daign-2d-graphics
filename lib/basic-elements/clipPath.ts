import { Box2 } from '@daign/math';
import { GraphicNode } from '@daign/2d-pipeline';

import { StyledGraphicNode } from '../styledGraphicNode';

/**
 * Class for a clip path element.
 */
export class ClipPath extends StyledGraphicNode {
  /**
   * Constructor.
   */
  public constructor() {
    super();

    this.baseClass = 'clip-path';
  }

  /**
   * Get the bounding box of all child elements of the clip path.
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
