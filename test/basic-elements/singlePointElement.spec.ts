import { expect } from 'chai';

import { SinglePointElement } from '../../lib';

export class TestClass extends SinglePointElement {
  public constructor() {
    super();
  }
}

describe( 'SinglePointElement', (): void => {
  describe( 'constructor', (): void => {
    it( 'should initialize with one point', (): void => {
      // Act
      const element = new TestClass();

      // Assert
      expect( element.points.length ).to.equal( 1 );
      expect( element.points.containsName( 'anchor' ) ).to.be.true;
    } );
  } );
} );
