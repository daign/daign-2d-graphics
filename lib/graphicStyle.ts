import { IStyleDeclaration } from '@daign/style-sheets';

/**
 * Implementation of IStyleDeclaration.
 */
export class GraphicStyle implements IStyleDeclaration {
  // Fill.
  public fill: string | null = null;
  public fillOpacity: number | null = null;
  public fillRule: string | null = null;

  // Stroke.
  public stroke: string | null = null;
  public strokeWidth: number | null = null;
  public strokeOpacity: number | null = null;
  public strokeLinecap: string | null = null;
  public strokeLinejoin: string | null = null;
  public strokeMiterlimit: number | null = null;
  public strokeDasharray: string | null = null;
  public strokeDashoffset: number | null = null;
  public vectorEffect: string | null = null;

  // Display.
  public display: string | null = null;
  public visibility: string | null = null;
  public opacity: number | null = null;
  public paintOrder: string | null = null;

  // Text.
  public fontFamily: string | null = null;
  public fontSize: string | null = null;
  public fontStyle: string | null = null;
  public fontVariant: string | null = null;
  public fontWeight: string | null = null;
  public fontStretch: string | null = null;
  public letterSpacing: string | null = null;
  public wordSpacing: string | null = null;
  public textDecoration: string | null = null;

  // Interactivity.
  public pointerEvents: string | null = null;
  public cursor: string | null = null;

  /**
   * Returns whether the declaration is empty (all attributes are equal null).
   */
  public get isEmpty(): boolean {
    return (
      this.fill === null &&
      this.fillOpacity === null &&
      this.fillRule === null &&
      this.stroke === null &&
      this.strokeWidth === null &&
      this.strokeOpacity === null &&
      this.strokeLinecap === null &&
      this.strokeLinejoin === null &&
      this.strokeMiterlimit === null &&
      this.strokeDasharray === null &&
      this.strokeDashoffset === null &&
      this.vectorEffect === null &&
      this.display === null &&
      this.visibility === null &&
      this.opacity === null &&
      this.paintOrder === null &&
      this.fontFamily === null &&
      this.fontSize === null &&
      this.fontStyle === null &&
      this.fontVariant === null &&
      this.fontWeight === null &&
      this.fontStretch === null &&
      this.letterSpacing === null &&
      this.wordSpacing === null &&
      this.textDecoration === null &&
      this.pointerEvents === null &&
      this.cursor === null
    );
  }

  /**
   * Constructor.
   * @param fill - Optional.
   * @param fillOpacity - Optional.
   * @param fillRule - Optional.
   * @param stroke - Optional.
   * @param strokeWidth - Optional.
   * @param strokeOpacity - Optional.
   * @param strokeLinecap - Optional.
   * @param strokeLinejoin - Optional.
   * @param strokeMiterlimit - Optional.
   * @param strokeDasharray - Optional.
   * @param strokeDashoffset - Optional.
   * @param vectorEffect - Optional.
   * @param display - Optional.
   * @param visibility - Optional.
   * @param opacity - Optional.
   * @param paintOrder - Optional.
   * @param fontFamily - Optional.
   * @param fontSize - Optional.
   * @param fontStyle - Optional.
   * @param fontVariant - Optional.
   * @param fontWeight - Optional.
   * @param fontStretch - Optional.
   * @param letterSpacing - Optional.
   * @param wordSpacing - Optional.
   * @param textDecoration - Optional.
   * @param pointerEvents - Optional.
   * @param cursor - Optional.
   */
  public constructor(
    fill?: string,
    fillOpacity?: number,
    fillRule?: string,
    stroke?: string,
    strokeWidth?: number,
    strokeOpacity?: number,
    strokeLinecap?: string,
    strokeLinejoin?: string,
    strokeMiterlimit?: number,
    strokeDasharray?: string,
    strokeDashoffset?: number,
    vectorEffect?: string,
    display?: string,
    visibility?: string,
    opacity?: number,
    paintOrder?: string,
    fontFamily?: string,
    fontSize?: string,
    fontStyle?: string,
    fontVariant?: string,
    fontWeight?: string,
    fontStretch?: string,
    letterSpacing?: string,
    wordSpacing?: string,
    textDecoration?: string,
    pointerEvents?: string,
    cursor?: string
  ) {
    if ( fill ) {
      this.fill = fill;
    }
    if ( fillOpacity ) {
      this.fillOpacity = fillOpacity;
    }
    if ( fillRule ) {
      this.fillRule = fillRule;
    }
    if ( stroke ) {
      this.stroke = stroke;
    }
    if ( strokeWidth ) {
      this.strokeWidth = strokeWidth;
    }
    if ( strokeOpacity ) {
      this.strokeOpacity = strokeOpacity;
    }
    if ( strokeLinecap ) {
      this.strokeLinecap = strokeLinecap;
    }
    if ( strokeLinejoin ) {
      this.strokeLinejoin = strokeLinejoin;
    }
    if ( strokeMiterlimit ) {
      this.strokeMiterlimit = strokeMiterlimit;
    }
    if ( strokeDasharray ) {
      this.strokeDasharray = strokeDasharray;
    }
    if ( strokeDashoffset ) {
      this.strokeDashoffset = strokeDashoffset;
    }
    if ( vectorEffect ) {
      this.vectorEffect = vectorEffect;
    }
    if ( display ) {
      this.display = display;
    }
    if ( visibility ) {
      this.visibility = visibility;
    }
    if ( opacity ) {
      this.opacity = opacity;
    }
    if ( paintOrder ) {
      this.paintOrder = paintOrder;
    }
    if ( fontFamily ) {
      this.fontFamily = fontFamily;
    }
    if ( fontSize ) {
      this.fontSize = fontSize;
    }
    if ( fontStyle ) {
      this.fontStyle = fontStyle;
    }
    if ( fontVariant ) {
      this.fontVariant = fontVariant;
    }
    if ( fontWeight ) {
      this.fontWeight = fontWeight;
    }
    if ( fontStretch ) {
      this.fontStretch = fontStretch;
    }
    if ( letterSpacing ) {
      this.letterSpacing = letterSpacing;
    }
    if ( wordSpacing ) {
      this.wordSpacing = wordSpacing;
    }
    if ( textDecoration ) {
      this.textDecoration = textDecoration;
    }
    if ( pointerEvents ) {
      this.pointerEvents = pointerEvents;
    }
    if ( cursor ) {
      this.cursor = cursor;
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
    } else if ( name === 'fill-opacity' ) {
      this.fillOpacity = parseFloat( value );
    } else if ( name === 'fill-rule' ) {
      this.fillRule = value;
    } else if ( name === 'stroke' ) {
      this.stroke = value;
    } else if ( name === 'stroke-width' ) {
      this.strokeWidth = parseFloat( value );
    } else if ( name === 'stroke-opacity' ) {
      this.strokeOpacity = parseFloat( value );
    } else if ( name === 'stroke-linecap' ) {
      this.strokeLinecap = value;
    } else if ( name === 'stroke-linejoin' ) {
      this.strokeLinejoin = value;
    } else if ( name === 'stroke-miterlimit' ) {
      this.strokeMiterlimit = parseFloat( value );
    } else if ( name === 'stroke-dasharray' ) {
      this.strokeDasharray = value;
    } else if ( name === 'stroke-dashoffset' ) {
      this.strokeDashoffset = parseFloat( value );
    } else if ( name === 'vector-effect' ) {
      this.vectorEffect = value;
    } else if ( name === 'display' ) {
      this.display = value;
    } else if ( name === 'visibility' ) {
      this.visibility = value;
    } else if ( name === 'opacity' ) {
      this.opacity = parseFloat( value );
    } else if ( name === 'paint-order' ) {
      this.paintOrder = value;
    } else if ( name === 'font-family' ) {
      this.fontFamily = value;
    } else if ( name === 'font-size' ) {
      this.fontSize = value;
    } else if ( name === 'font-style' ) {
      this.fontStyle = value;
    } else if ( name === 'font-variant' ) {
      this.fontVariant = value;
    } else if ( name === 'font-weight' ) {
      this.fontWeight = value;
    } else if ( name === 'font-stretch' ) {
      this.fontStretch = value;
    } else if ( name === 'letter-spacing' ) {
      this.letterSpacing = value;
    } else if ( name === 'word-spacing' ) {
      this.wordSpacing = value;
    } else if ( name === 'text-decoration' ) {
      this.textDecoration = value;
    } else if ( name === 'pointer-events' ) {
      this.pointerEvents = value;
    } else if ( name === 'cursor' ) {
      this.cursor = value;
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
    if ( this.fillOpacity === null ) {
      this.fillOpacity = declaration.fillOpacity;
    }
    if ( this.fillRule === null ) {
      this.fillRule = declaration.fillRule;
    }
    if ( this.stroke === null ) {
      this.stroke = declaration.stroke;
    }
    if ( this.strokeWidth === null ) {
      this.strokeWidth = declaration.strokeWidth;
    }
    if ( this.strokeOpacity === null ) {
      this.strokeOpacity = declaration.strokeOpacity;
    }
    if ( this.strokeLinecap === null ) {
      this.strokeLinecap = declaration.strokeLinecap;
    }
    if ( this.strokeLinejoin === null ) {
      this.strokeLinejoin = declaration.strokeLinejoin;
    }
    if ( this.strokeMiterlimit === null ) {
      this.strokeMiterlimit = declaration.strokeMiterlimit;
    }
    if ( this.strokeDasharray === null ) {
      this.strokeDasharray = declaration.strokeDasharray;
    }
    if ( this.strokeDashoffset === null ) {
      this.strokeDashoffset = declaration.strokeDashoffset;
    }
    if ( this.vectorEffect === null ) {
      this.vectorEffect = declaration.vectorEffect;
    }
    if ( this.display === null ) {
      this.display = declaration.display;
    }
    if ( this.visibility === null ) {
      this.visibility = declaration.visibility;
    }
    if ( this.opacity === null ) {
      this.opacity = declaration.opacity;
    }
    if ( this.paintOrder === null ) {
      this.paintOrder = declaration.paintOrder;
    }
    if ( this.fontFamily === null ) {
      this.fontFamily = declaration.fontFamily;
    }
    if ( this.fontSize === null ) {
      this.fontSize = declaration.fontSize;
    }
    if ( this.fontStyle === null ) {
      this.fontStyle = declaration.fontStyle;
    }
    if ( this.fontVariant === null ) {
      this.fontVariant = declaration.fontVariant;
    }
    if ( this.fontWeight === null ) {
      this.fontWeight = declaration.fontWeight;
    }
    if ( this.fontStretch === null ) {
      this.fontStretch = declaration.fontStretch;
    }
    if ( this.letterSpacing === null ) {
      this.letterSpacing = declaration.letterSpacing;
    }
    if ( this.wordSpacing === null ) {
      this.wordSpacing = declaration.wordSpacing;
    }
    if ( this.textDecoration === null ) {
      this.textDecoration = declaration.textDecoration;
    }
    if ( this.pointerEvents === null ) {
      this.pointerEvents = declaration.pointerEvents;
    }
    if ( this.cursor === null ) {
      this.cursor = declaration.cursor;
    }
  }

  /**
   * Return the style declaration as string.
   */
  public printStyle(): string {
    const attributes = [];

    if ( this.fill ) {
      attributes.push( `fill: ${this.fill}` );
    }
    if ( this.fillOpacity ) {
      attributes.push( `fill-opacity: ${this.fillOpacity}` );
    }
    if ( this.fillRule ) {
      attributes.push( `fill-rule: ${this.fillRule}` );
    }
    if ( this.stroke ) {
      attributes.push( `stroke: ${this.stroke}` );
    }
    if ( this.strokeWidth ) {
      attributes.push( `stroke-width: ${this.strokeWidth}` );
    }
    if ( this.strokeOpacity ) {
      attributes.push( `stroke-opacity: ${this.strokeOpacity}` );
    }
    if ( this.strokeLinecap ) {
      attributes.push( `stroke-linecap: ${this.strokeLinecap}` );
    }
    if ( this.strokeLinejoin ) {
      attributes.push( `stroke-linejoin: ${this.strokeLinejoin}` );
    }
    if ( this.strokeMiterlimit ) {
      attributes.push( `stroke-miterlimit: ${this.strokeMiterlimit}` );
    }
    if ( this.strokeDasharray ) {
      attributes.push( `stroke-dasharray: ${this.strokeDasharray}` );
    }
    if ( this.strokeDashoffset ) {
      attributes.push( `stroke-dashoffset: ${this.strokeDashoffset}` );
    }
    if ( this.vectorEffect ) {
      attributes.push( `vector-effect: ${this.vectorEffect}` );
    }
    if ( this.display ) {
      attributes.push( `display: ${this.display}` );
    }
    if ( this.visibility ) {
      attributes.push( `visibility: ${this.visibility}` );
    }
    if ( this.opacity ) {
      attributes.push( `opacity: ${this.opacity}` );
    }
    if ( this.paintOrder ) {
      attributes.push( `paint-order: ${this.paintOrder}` );
    }
    if ( this.fontFamily ) {
      attributes.push( `font-family: ${this.fontFamily}` );
    }
    if ( this.fontSize ) {
      attributes.push( `font-size: ${this.fontSize}` );
    }
    if ( this.fontStyle ) {
      attributes.push( `font-style: ${this.fontStyle}` );
    }
    if ( this.fontVariant ) {
      attributes.push( `font-variant: ${this.fontVariant}` );
    }
    if ( this.fontWeight ) {
      attributes.push( `font-weight: ${this.fontWeight}` );
    }
    if ( this.fontStretch ) {
      attributes.push( `font-stretch: ${this.fontStretch}` );
    }
    if ( this.letterSpacing ) {
      attributes.push( `letter-spacing: ${this.letterSpacing}` );
    }
    if ( this.wordSpacing ) {
      attributes.push( `word-spacing: ${this.wordSpacing}` );
    }
    if ( this.textDecoration ) {
      attributes.push( `text-decoration: ${this.textDecoration}` );
    }
    if ( this.pointerEvents ) {
      attributes.push( `pointer-events: ${this.pointerEvents}` );
    }
    if ( this.cursor ) {
      attributes.push( `cursor: ${this.cursor}` );
    }

    return attributes.join( ', ' );
  }
}
