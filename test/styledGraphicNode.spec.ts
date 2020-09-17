import { expect } from 'chai';

import { StyledGraphicNode } from '../lib/styledGraphicNode';

class TestNode extends StyledGraphicNode {
  public constructor() {
    super();
  }
}

describe( 'StyledGraphicNode', (): void => {
  describe( 'addClass', (): void => {
    it( 'should append class name to array', (): void => {
      // Arrange
      const node = new TestNode();

      // Act
      node.addClass( 'SomeName' );

      // Assert
      expect( ( node as any ).customClasses[ 0 ] ).to.equal( 'SomeName' );
    } );
  } );
} );
