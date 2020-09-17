import { Box2, Matrix3, Vector2 } from '@daign/math';

import { StyledGraphicNode } from '../styledGraphicNode';

/**
 * Class for a rectangle element defined by two points.
 */
export class TwoPointRectangle extends StyledGraphicNode {
  public get start(): Vector2 {
    return this._points[ 0 ];
  }

  public set start( position: Vector2 ) {
    this._points[ 0 ].copy( position );
  }

  public get end(): Vector2 {
    return this._points[ 1 ];
  }

  public set end( position: Vector2 ) {
    this._points[ 1 ].copy( position );
  }

  /**
   * Constructor.
   */
  public constructor() {
    super();

    this.baseClass = 'rectangle';
    this.createPoints( 2 );
  }

  /**
   * Calculate the start after a given transformation.
   * @param transformation - The transformation to apply.
   * @returns The transformed start position.
   */
  public getStartTransformed( transformation: Matrix3 ): Vector2 {
    const area = new Box2();
    const startPoint = this.start.clone().transform( transformation );
    area.expandByPoint( startPoint );
    const endPoint = this.end.clone().transform( transformation );
    area.expandByPoint( endPoint );
    return area.min;
  }

  /**
   * Calculate the size after a given transformation.
   * @param transformation - The transformation to apply.
   * @returns The transformed size.
   */
  public getSizeTransformed( transformation: Matrix3 ): Vector2 {
    const area = new Box2();
    const startPoint = this.start.clone().transform( transformation );
    area.expandByPoint( startPoint );
    const endPoint = this.end.clone().transform( transformation );
    area.expandByPoint( endPoint );
    return area.size;
  }
}
