import { Matrix3, Vector2 } from '@daign/math';

import { StyledGraphicNode } from '../styledGraphicNode';

/**
 * Class for a line segment element.
 */
export class Line extends StyledGraphicNode {
  public get start(): Vector2 {
    return this._points[ 0 ];
  }

  public set start( position: Vector2 ) {
    this._points[0].copy( position );
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

    this.baseClass = 'line';
    this.createPoints( 2 );
  }

  /**
   * Calculate the start after a given transformation.
   * @param transformation - The transformation to apply.
   * @returns The transformed start position.
   */
  public getStartTransformed( transformation: Matrix3 ): Vector2 {
    const startPoint = this.start.clone().transform( transformation );
    return startPoint;
  }

  /**
   * Calculate the end after a given transformation.
   * @param transformation - The transformation to apply.
   * @returns The transformed end position.
   */
  public getEndTransformed( transformation: Matrix3 ): Vector2 {
    const endPoint = this.end.clone().transform( transformation );
    return endPoint;
  }
}
