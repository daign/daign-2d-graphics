import { expect } from 'chai';

import { StyledGraphicNode } from '../lib';

class TestNode extends StyledGraphicNode {
  public constructor() {
    super();
  }
}

describe( 'StyledGraphicNode', (): void => {
  describe( 'addClass', (): void => {
    it( 'should append to class names array', (): void => {
      // Arrange
      const node = new TestNode();

      // Act
      node.addClass( 'SomeName' );

      // Assert
      expect( ( node as any ).classNames.getElement( 0 )!.value ).to.equal( 'SomeName' );
    } );
  } );
} );
