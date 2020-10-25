import { expect } from 'chai';

import { Application, ApplicationView } from '../../lib';
import { TestContext } from '../testContext';

describe( 'ApplicationView', (): void => {
  describe( 'constructor', (): void => {
    it( 'should set the corresponding application reference', (): void => {
      // Arrange
      const context = new TestContext();
      const application = new Application( context );

      // Act
      const applicationView = new ApplicationView( application );

      // Assert
      expect( applicationView.application ).to.equal( application );
    } );
  } );
} );
