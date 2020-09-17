import { Box2 } from '@daign/math';
import { GraphicNode } from '@daign/2d-pipeline';

import { StyledGraphicNode } from '../styledGraphicNode';

/**
 * Class for a group element.
 */
export class Group extends StyledGraphicNode {
  /**
   * Constructor.
   */
  public constructor() {
    super();

    this.baseClass = 'group';
  }

  /**
   * Get the bounding box of all child elements of the group.
   * @returns The bounding box.
   */
  public getBox(): Box2 {
    const box = new Box2();
    this.children.forEach( ( child: GraphicNode ): void => {
      if ( child instanceof StyledGraphicNode ) {
        box.expandByBox( child.getBox() );
      }
    } );
    const min = box.min.clone().transform( this.transformation.transformMatrix );
    const max = box.max.clone().transform( this.transformation.transformMatrix );
    const transformedBox = new Box2();
    transformedBox.expandByPoint( min );
    transformedBox.expandByPoint( max );
    return transformedBox;
  }
}
