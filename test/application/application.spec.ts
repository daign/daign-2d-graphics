import { expect } from 'chai';

import { Application } from '../../lib';
import { TestContext } from '../testContext';

describe( 'Application', (): void => {
  describe( 'constructor', (): void => {
    it( 'should append one child to the node', (): void => {
      // Arrange
      const context = new TestContext();

      // Act
      const application = new Application( context );

      // Assert
      expect( application.children.length ).to.equal( 1 );
    } );

    it( 'should append two children to the node if interactive', (): void => {
      // Arrange
      const context = new TestContext();

      // Act
      const interactive = true;
      const application = new Application( context, interactive );

      // Assert
      expect( application.children.length ).to.equal( 2 );
    } );
  } );
} );
