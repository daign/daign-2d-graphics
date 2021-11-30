import { expect } from 'chai';
import * as sinon from 'sinon';

import { MockDocument, MockEvent, MockNode } from '@daign/mock-dom';
import { Vector2 } from '@daign/math';

import { Application, InteractiveViewport } from '../../lib';
import { TestContext } from '../testContext';

declare var global: any;

/**
 * Sleep function.
 * @param milliseconds - The time to pause code execution.
 */
const sleep = ( milliseconds: number ): Promise<void> => {
  return new Promise( ( resolve: any ): void => {
    setTimeout( resolve, milliseconds );
  } );
};

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

  describe( 'enableViewportActions', (): void => {
    it( 'should set the enabled state of the viewport handle', (): void => {
      // Arrange
      const domNode = new MockNode();
      const context = new TestContext();
      context.domNode = domNode;
      const application = new Application( context );
      const viewport = new InteractiveViewport( context, application );

      // Act
      viewport.enableViewportActions( false );

      // Assert
      expect( ( viewport as any ).viewportHandle.enabled ).to.be.false;
    } );
  } );

  describe( 'drag handling', (): void => {
    it( 'should update the viewport center', async (): Promise<void> => {
      // Arrange
      const domNode = new MockNode();
      const context = new TestContext();
      context.domNode = domNode;
      const application = new Application( context );
      const viewport = new InteractiveViewport( context, application );

      const startEvent = new MockEvent().setOffsetPoint( 0, 0 );
      const dragEvent = new MockEvent().setOffsetPoint( 1, 10 );
      const endEvent = new MockEvent().setOffsetPoint( 2, 10 );

      const startCenter = new Vector2( 0.5, 0.5 );
      expect( ( viewport as any ).viewCenter.equals( startCenter ) ).to.be.true;

      // Act
      domNode.sendEvent( 'mousedown', startEvent );
      global.document.sendEvent( 'mousemove', dragEvent );
      global.document.sendEvent( 'mouseup', endEvent );

      // Wait until throttling function is finished.
      await sleep( 50 );

      // Assert
      const expectedCenter = new Vector2( -0.5, -9.5 );
      expect( ( viewport as any ).viewCenter.equals( expectedCenter ) ).to.be.true;
    } );
  } );
} );
