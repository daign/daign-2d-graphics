import { Box2, Matrix3, StringArray, StringValue, Vector2, Vector2Array } from '@daign/math';
import { GraphicNode } from '@daign/2d-pipeline';
import { StyleSelector } from '@daign/style-sheets';

import { GraphicStyle } from './graphicStyle';

/**
 * Abstract class for graphic nodes that are defined by points and to which styles apply.
 */
export abstract class StyledGraphicNode extends GraphicNode {
  // Array of points that define the element.
  public points: Vector2Array = new Vector2Array();

  // Class names assigned to the element.
  private classNames: StringArray = new StringArray();

  // Style selector object containing all class names of the element.
  public styleSelector: StyleSelector = new StyleSelector();

  // Style applied directly to the element.
  public elementStyle: GraphicStyle | null = null;

  /**
   * Setter for the base class.
   * @param baseClass - The name of the base class.
   */
  protected set baseClass( baseClass: string ) {
    if ( this.classNames.containsName( 'baseClass' ) ) {
      this.classNames.getByName( 'baseClass' ).value = baseClass;
    } else {
      this.classNames.push( new StringValue( baseClass ), 'baseClass' );
    }
  }

  /**
   * Constructor.
   */
  protected constructor() {
    super();

    // Rebuild the style selector object on every class name change.
    this.classNames.subscribeToChanges( (): void => {
      this.buildStyleSelector();
    } );
  }

  /**
   * Get points after transformation.
   * @param transformation - The transformation to apply.
   * @returns The array of transformed points.
   */
  public getPointsTransformed( transformation: Matrix3 ): Vector2[] {
    return this.points.cloneDeep().transform( transformation ).elements;
  }

  /**
   * Get the transformed bounding box of all points of the element.
   * @returns The transformed bounding box.
   */
  public getBoxTransformed(): Box2 {
    return this.getBox().transform( this.transformation.transformMatrix );
  }

  /**
   * Get the bounding box of all points of the element.
   * @returns The bounding box.
   */
  public getBox(): Box2 {
    return this.points.getBox();
  }

  /**
   * Add a class name.
   * @param className - The class name.
   */
  public addClass( className: string ): void {
    this.classNames.push( new StringValue( className ) );
  }

  /**
   * Add or overwrite a class name by identifier.
   * @param identifier - The identifier.
   * @param className - The class name.
   */
  public setVariableClass( identifier: string, className: string ): void {
    if ( identifier === 'baseClass' ) {
      throw new Error( 'baseClass is a protected identifier.' );
    }

    if ( this.classNames.containsName( identifier ) ) {
      this.classNames.getByName( identifier ).value = className;
    } else {
      this.classNames.push( new StringValue( className ), identifier );
    }
  }

  /**
   * Construct the style selector object.
   */
  private buildStyleSelector(): void {
    const selectorString = this.classNames.elements.map( ( s: StringValue ): string =>
      `.${s.value}`
    ).join( '' );

    this.styleSelector = new StyleSelector( selectorString );
  }
}
