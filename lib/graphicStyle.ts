import { IStyleDeclaration } from '@daign/style-sheets';

/**
 * Implementation of IStyleDeclaration.
 */
export class GraphicStyle implements IStyleDeclaration {
  public fill: string | null = null;
  public stroke: string | null = null;
  public strokeWidth: number | null = null;
  public opacity: number | null = null;
  public fontSize: string | null = null;

  /**
   * Returns whether the declaration is empty (all attributes are equal null).
   */
  public get isEmpty(): boolean {
    return (
      this.fill === null &&
      this.stroke === null &&
      this.strokeWidth === null &&
      this.opacity === null &&
      this.fontSize === null
    );
  }

  /**
   * Constructor.
   * @param fill - Optional.
   * @param stroke - Optional.
   * @param strokeWidth - Optional.
   * @param opacity - Optional.
   * @param fontSize - Optional.
   */
  public constructor( fill?: string, stroke?: string, strokeWidth?: number,
    opacity?: number, fontSize?: string ) {
    if ( fill ) {
      this.fill = fill;
    }
    if ( stroke ) {
      this.stroke = stroke;
    }
    if ( strokeWidth ) {
      this.strokeWidth = strokeWidth;
    }
    if ( opacity ) {
      this.opacity = opacity;
    }
    if ( fontSize ) {
      this.fontSize = fontSize;
    }
  }

  /**
   * Parse the value of an attribute from string.
   * @param name - The name of the attribute.
   * @param value - The value as a string.
   */
  public parseAttribute( name: string, value: string ): void {
    if ( name === 'fill' ) {
      this.fill = value;
    } else if ( name === 'stroke' ) {
      this.stroke = value;
    } else if ( name === 'stroke-width' ) {
      this.strokeWidth = parseFloat( value );
    } else if ( name === 'opacity' ) {
      this.opacity = parseFloat( value );
    } else if ( name === 'font-size' ) {
      this.fontSize = value;
    }
  }

  /**
   * Copy style attributes from given style declaration but don't override already existing values.
   * @param declaration - The style declaration whose values to use.
   */
  public complementWith( declaration: GraphicStyle ): void {
    if ( this.fill === null ) {
      this.fill = declaration.fill;
    }
    if ( this.stroke === null ) {
      this.stroke = declaration.stroke;
    }
    if ( this.strokeWidth === null ) {
      this.strokeWidth = declaration.strokeWidth;
    }
    if ( this.opacity === null ) {
      this.opacity = declaration.opacity;
    }
    if ( this.fontSize === null ) {
      this.fontSize = declaration.fontSize;
    }
  }
}
