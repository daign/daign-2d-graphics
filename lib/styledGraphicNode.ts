import { Box2, Matrix3, Vector2 } from '@daign/math';
import { GraphicNode } from '@daign/2d-pipeline';
import { StyleSelector } from '@daign/style-sheets';

import { GraphicStyle } from './graphicStyle';

/**
 * Abstract class for graphic nodes to which styles apply.
 */
export abstract class StyledGraphicNode extends GraphicNode {
  /**
   * Array of points that define the element.
   */
  protected _points: Vector2[] = [];

  /**
   * Setter for the points array.
   */
  public set points( input: Vector2[] ) {
    this._points = input.map( ( point: Vector2 ): Vector2 => {
      return point.clone();
    } );
  }

  /**
   * Style selectors assinged by users of the element.
   */
  private customClasses: string[] = [];

  /**
   * Style selector for the element type.
   */
  private _baseClass: string | null = null;

  /**
   * Setter for the base class.
   */
  protected set baseClass( baseClass: string ) {
    this._baseClass = baseClass;
    this.buildStyleSelector();
  }

  /**
   * Style selector object containing all style selectors of the element.
   */
  public styleSelector: StyleSelector = new StyleSelector();

  /**
   * Style applied directly to the element.
   */
  public elementStyle: GraphicStyle | null = null;

  /**
   * Constructor.
   */
  protected constructor() {
    super();
  }

  /**
   * Initialize the element with a given number of points.
   * @param n - The number of points.
   */
  protected createPoints( n: number ): void {
    for ( let i = 0; i < n; i += 1 ) {
      this._points.push( new Vector2() );
    }
  }

  /**
   * Get points after transformation.
   * @param transformation - The transformation to apply.
   * @returns The array of transformed points.
   */
  public getPointsTransformed( transformation: Matrix3 ): Vector2[] {
    const points = this._points.map( ( p: Vector2 ): Vector2 => {
      return p.clone().transform( transformation );
    } );
    return points;
  }

  /**
   * Get the bounding box of all points of the element.
   * @returns The bounding box.
   */
  public getBox(): Box2 {
    const box = new Box2();
    this._points.forEach( ( p: Vector2 ): void => {
      const transformedPoint = p.clone().transform( this.transformation.transformMatrix );
      box.expandByPoint( transformedPoint );
    } );
    return box;
  }

  /**
   * Add a custom class.
   * @param className - The style selector name.
   */
  public addClass( className: string ): void {
    this.customClasses.push( className );
    this.buildStyleSelector();
  }

  /**
   * Construct the style selector object.
   */
  private buildStyleSelector(): void {
    let selectorString = this.customClasses.map( ( customClass: string ): string =>
      `.${customClass}`
    ).join();
    if ( this._baseClass ) {
      selectorString += `.${this._baseClass}`;
    }

    this.styleSelector = new StyleSelector( selectorString );
  }
}
