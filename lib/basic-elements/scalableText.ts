import { Box2, Matrix3, Vector2 } from '@daign/math';

import { StyledGraphicNode } from '../styledGraphicNode';

/**
 * Class for a scalable text element at an anchor position.
 * There is a second point whose distance to the anchor defines the font size. Therefore, the font
 * size scales proportionally. Unproportional scaling, rotation and perspective transformations are
 * not supported.
 */
export class ScalableText extends StyledGraphicNode {
  // The text content of the text element.
  public content: string = '';

  // The attribute defining the alignment of the text relative to its anchor.
  public textAnchor: string = 'end';

  /**
   * Getter for the anchor position.
   */
  public get anchor(): Vector2 {
    return this.points.getByName( 'anchor' );
  }

  /**
   * Setter for the anchor position.
   */
  public set anchor( position: Vector2 ) {
    this.points.getByName( 'anchor' ).copy( position );
  }

  /**
   * Getter for the point representing the font size.
   */
  public get heightPoint(): Vector2 {
    return this.points.getByName( 'heightPoint' );
  }

  // Font size in element coordinates.
  private _fontSize: number = 1;

  /**
   * Setter for the font size.
   */
  public set fontSize( size: number ) {
    this._fontSize = size;

    /* The position of the height point is set in negative y direction. Therefore scaling along the
     * x-axis will not affect the font size. */
    const position = this.anchor.clone().add( new Vector2( 0, -size ) );
    this.points.getByName( 'heightPoint' ).copy( position );
  }

  /**
   * Getter for the font size.
   */
  public get fontSize(): number {
    return this._fontSize;
  }

  /**
   * Constructor.
   */
  public constructor() {
    super();

    this.baseClass = 'scalableText';
    this.points.initializeElements( 2 );
    this.points.assignName( 'anchor', 0 );
    this.points.assignName( 'heightPoint', 1 );
  }

  /**
   * Calculate the fontSize after a given transformation.
   * @param transformation - The transformation to apply.
   * @returns The transformed fontSize.
   */
  public getFontSizeTransformed( transformation: Matrix3 ): number {
    const anchorPoint = this.anchor.clone().transform( transformation );
    const heightPoint = this.heightPoint.clone().transform( transformation );
    const fontSize = anchorPoint.distanceTo( heightPoint );
    return fontSize;
  }

  /**
   * Calculate the anchor after a given transformation.
   * @param transformation - The transformation to apply.
   * @returns The transformed anchor position.
   */
  public getAnchorTransformed( transformation: Matrix3 ): Vector2 {
    const anchorPoint = this.anchor.clone().transform( transformation );
    return anchorPoint;
  }

  /**
   * Get an approximated bounding box of the scalable text.
   * @returns The bounding box.
   */
  public getBox(): Box2 {
    const box = new Box2();

    box.expandByPoint( this.anchor );
    box.expandByPoint( this.heightPoint );

    // The width of the text is estimated to be half the font size per character.
    const estimatedWidth = this.content.length * this.fontSize * 0.5;

    // Expand left and right.
    if ( this.textAnchor === 'end' ) {
      box.expandByPoint( this.anchor.clone().add( new Vector2( -estimatedWidth, 0 ) ) );
    } else if ( this.textAnchor === 'start' ) {
      box.expandByPoint( this.anchor.clone().add( new Vector2( estimatedWidth, 0 ) ) );
    } else if ( this.textAnchor === 'middle' ) {
      box.expandByPoint( this.anchor.clone().add( new Vector2( 0.5 * estimatedWidth, 0 ) ) );
      box.expandByPoint( this.anchor.clone().add( new Vector2( -0.5 * estimatedWidth, 0 ) ) );
    }

    return box;
  }
}

