import { expect } from 'chai';

import { Vector2 } from '@daign/math';

import { TestContext } from './testContext';

describe( 'TestContext', (): void => {
  describe( 'getter size', (): void => {
    it( 'should return the size', (): void => {
      // Arrange
      const context = new TestContext();

      // Act
      const result = context.size;

      // Assert
      expect( result.equals( new Vector2( 1, 1 ) ) ).to.be.true;
    } );
  } );
} );
