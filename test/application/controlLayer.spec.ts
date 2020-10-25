import { expect } from 'chai';

import { Application, ControlLayer } from '../../lib';
import { TestContext } from '../testContext';

describe( 'ControlLayer', (): void => {
  describe( 'constructor', (): void => {
    it( 'should set the corresponding application reference', (): void => {
      // Arrange
      const context = new TestContext();
      const application = new Application( context );

      // Act
      const controlLayer = new ControlLayer( application );

      // Assert
      expect( ( controlLayer as any ).application ).to.equal( application );
    } );
  } );
} );
