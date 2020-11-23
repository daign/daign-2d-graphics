import { expect } from 'chai';
import * as sinon from 'sinon';

import { MockDocument, MockNode } from '@daign/mock-dom';

import { Application, InteractiveViewport } from '../../lib';
import { TestContext } from '../testContext';

declare var global: any;

describe( 'InteractiveViewport', (): void => {
  beforeEach( (): void => {
    global.document = new MockDocument();
  } );

  describe( 'constructor', (): void => {
    it( 'should add 3 event listeners to the dom node', (): void => {
      // Arrange
      const domNode = new MockNode();
      const context = new TestContext();
      context.domNode = domNode;
      const application = new Application( context );
      const addEventListenerSpy = sinon.spy( domNode, 'addEventListener' );

      // Act
      // tslint:disable-next-line:no-unused-expression-chai
      new InteractiveViewport( context, application );

      // Assert
      expect( addEventListenerSpy.called ).to.be.true;
      expect( addEventListenerSpy.callCount ).to.equal( 3 );
    } );
  } );
} );
