import { Matrix3, Vector2 } from '@daign/math';

import { StyledGraphicNode } from '../styledGraphicNode';

/**
 * Class for a line segment element.
 */
export class Line extends StyledGraphicNode {
  public get start(): Vector2 {
    return this.points.getByName( 'start' );
  }

  public set start( position: Vector2 ) {
    this.points.getByName( 'start' ).copy( position );
  }

  public get end(): Vector2 {
    return this.points.getByName( 'end' );
  }

  public set end( position: Vector2 ) {
    this.points.getByName( 'end' ).copy( position );
  }

  /**
   * Constructor.
   */
  public constructor() {
    super();

    this.baseClass = 'line';
    this.points.initializeElements( 2 );
    this.points.assignName( 'start', 0 );
    this.points.assignName( 'end', 1 );
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
