import { expect } from 'chai';
import * as sinon from 'sinon';

import { MockDocument, MockEvent, MockNode } from '@daign/mock-dom';
import { Vector2 } from '@daign/math';

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

    it( 'should not throw error when viewportHandle does not exist', (): void => {
      // Arrange
      const context = new TestContext();
      const application = new Application( context );
      const viewport = new InteractiveViewport( context, application );

      // Act
      const goodFn = (): void => {
        viewport.enableViewportActions( true );
      };

      // Assert
      expect( goodFn ).to.not.throw();
    } );
  } );

  describe( 'viewportHandle', (): void => {
    it( 'should update the viewport center when dragging', (): void => {
      // Arrange
      const domNode = new MockNode();
      const context = new TestContext();
      context.domNode = domNode;
      const application = new Application( context );
      const viewport = new InteractiveViewport( context, application );

      const startEvent = new MockEvent();
      startEvent.setOffsetPoint( 100, 100 );
      startEvent.setClientPoint( 0, 0 );
      const dragEvent = new MockEvent().setClientPoint( 1, 10 );
      const endEvent = new MockEvent().setClientPoint( 2, 10 );

      const startCenter = new Vector2( 0.5, 0.5 );
      expect( ( viewport as any ).viewCenter.equals( startCenter ) ).to.be.true;

      // Act
      domNode.sendEvent( 'mousedown', startEvent );
      global.document.sendEvent( 'mousemove', dragEvent );
      global.document.sendEvent( 'mouseup', endEvent );

      // Assert
      const expectedCenter = new Vector2( -0.5, -9.5 );
      expect( ( viewport as any ).viewCenter.equals( expectedCenter ) ).to.be.true;
    } );

    it( 'should update the viewport scale during a multi touch drag', (): void => {
      // Arrange
      const domNode = new MockNode();
      const context = new TestContext();
      context.domNode = domNode;
      const application = new Application( context );
      const viewport = new InteractiveViewport( context, application );

      // Construct start event.
      const startEvent = new MockEvent();
      const target = new MockNode().setBoundingClientRect( { left: 1, top: 2 } );
      startEvent.target = target;
      startEvent.addTouchPoint( new MockEvent().setClientPoint( 0, 0 ).setPagePoint( 1, 2 ) );
      startEvent.addTouchPoint( new MockEvent().setClientPoint( 0, 20 ).setPagePoint( 1, 22 ) );

      // Construct drag event.
      const dragEvent = new MockEvent();
      dragEvent.addTouchPoint( new MockEvent().setClientPoint( 0, -10 ) );
      dragEvent.addTouchPoint( new MockEvent().setClientPoint( 0, 30 ) );

      const endEvent = new MockEvent();

      expect( ( viewport as any ).viewScale ).to.equal( 1 );

      // Act
      domNode.sendEvent( 'mousedown', startEvent );
      global.document.sendEvent( 'mousemove', dragEvent );
      global.document.sendEvent( 'mouseup', endEvent );

      // Assert
      expect( ( viewport as any ).viewScale ).to.equal( 2 );
    } );

    it( 'should update the viewport center during a multi touch drag', (): void => {
      // Arrange
      const domNode = new MockNode();
      const context = new TestContext();
      context.domNode = domNode;
      const application = new Application( context );
      const viewport = new InteractiveViewport( context, application );
      ( viewport as any ).viewCenter.set( 0, 77 );

      // Construct start event.
      const startEvent = new MockEvent();
      const target = new MockNode().setBoundingClientRect( { left: 0, top: 0 } );
      startEvent.target = target;
      startEvent.addTouchPoint( new MockEvent().setClientPoint( 0, 70 ).setPagePoint( 0, 70 ) );
      startEvent.addTouchPoint( new MockEvent().setClientPoint( 0, 81 ).setPagePoint( 0, 81 ) );

      // Construct drag event.
      const dragEvent = new MockEvent();
      dragEvent.addTouchPoint( new MockEvent().setClientPoint( 0, 65 ) );
      dragEvent.addTouchPoint( new MockEvent().setClientPoint( 0, 87 ) );

      const endEvent = new MockEvent();

      // Act
      domNode.sendEvent( 'mousedown', startEvent );
      global.document.sendEvent( 'mousemove', dragEvent );
      global.document.sendEvent( 'mouseup', endEvent );

      // Assert
      const expectedCenter = new Vector2( 0, 76 );
      expect( ( viewport as any ).viewCenter.equals( expectedCenter ) ).to.be.true;
    } );

    it( 'should not update scale or center when drag event is missing coordinates', (): void => {
      // Arrange
      const domNode = new MockNode();
      const context = new TestContext();
      context.domNode = domNode;
      const application = new Application( context );
      const viewport = new InteractiveViewport( context, application );

      // Construct start event.
      const startEvent = new MockEvent();
      const target = new MockNode().setBoundingClientRect( { left: 0, top: 0 } );
      startEvent.target = target;
      startEvent.addTouchPoint( new MockEvent().setClientPoint( 0, 70 ).setPagePoint( 0, 70 ) );
      startEvent.addTouchPoint( new MockEvent().setClientPoint( 0, 81 ).setPagePoint( 0, 81 ) );

      // Drag event without any coordinates.
      const dragEvent = new MockEvent();

      const endEvent = new MockEvent();

      const startCenter = new Vector2( 0.5, 0.5 );
      expect( ( viewport as any ).viewCenter.equals( startCenter ) ).to.be.true;
      expect( ( viewport as any ).viewScale ).to.equal( 1 );

      // Act
      domNode.sendEvent( 'mousedown', startEvent );
      global.document.sendEvent( 'mousemove', dragEvent );
      global.document.sendEvent( 'mouseup', endEvent );

      // Assert
      expect( ( viewport as any ).viewCenter.equals( startCenter ) ).to.be.true;
      expect( ( viewport as any ).viewScale ).to.equal( 1 );
    } );

    it( 'should deactivate selected elements when viewport area is clicked', (): void => {
      // Arrange
      const domNode = new MockNode();
      const context = new TestContext();
      context.domNode = domNode;
      const application = new Application( context );
      const spySetSelection = sinon.spy( application.selectionManager, 'setSelection' );
      // tslint:disable-next-line:no-unused-expression-chai
      new InteractiveViewport( context, application );

      const clickEvent = new MockEvent();
      clickEvent.setOffsetPoint( 100, 100 );
      clickEvent.setClientPoint( 0, 0 );

      // Act
      domNode.sendEvent( 'mousedown', clickEvent );
      global.document.sendEvent( 'mouseup', clickEvent );

      // Assert
      expect( spySetSelection.calledOnce ).to.be.true;
      expect( spySetSelection.calledWith( null, null ) ).to.be.true;
    } );

    it( 'should update the viewport scale when scrolling', (): void => {
      // Arrange
      const domNode = new MockNode();
      const context = new TestContext();
      context.domNode = domNode;
      const application = new Application( context );
      const viewport = new InteractiveViewport( context, application );

      const scrollEvent = new MockEvent();
      scrollEvent.setScrollDelta( 0, 2 );
      scrollEvent.setOffsetPoint( 0.5, 0.5 );

      expect( ( viewport as any ).viewScale ).equals( 1 );

      // Act
      domNode.sendEvent( 'wheel', scrollEvent );

      // Assert
      expect( ( viewport as any ).viewScale ).to.be.closeTo( 0.909, 0.001 );
    } );

    it( 'should not update the viewport center when scrolling in the center', (): void => {
      // Arrange
      const domNode = new MockNode();
      const context = new TestContext();
      context.domNode = domNode;
      const application = new Application( context );
      const viewport = new InteractiveViewport( context, application );

      const scrollEvent = new MockEvent();
      scrollEvent.setScrollDelta( 0, 2 );
      scrollEvent.setOffsetPoint( 0.5, 0.5 );

      const startCenter = new Vector2( 0.5, 0.5 );
      expect( ( viewport as any ).viewCenter.equals( startCenter ) ).to.be.true;

      // Act
      domNode.sendEvent( 'wheel', scrollEvent );

      // Assert
      expect( ( viewport as any ).viewCenter.equals( startCenter ) ).to.be.true;
    } );

    it( 'should update the viewport center when not scrolling in the center', (): void => {
      // Arrange
      const domNode = new MockNode();
      const context = new TestContext();
      context.domNode = domNode;
      const application = new Application( context );
      const viewport = new InteractiveViewport( context, application );

      const scrollEvent = new MockEvent();
      scrollEvent.setScrollDelta( 0, 2 );
      scrollEvent.setOffsetPoint( 0.2, 0.2 );

      const startCenter = new Vector2( 0.5, 0.5 );
      expect( ( viewport as any ).viewCenter.equals( startCenter ) ).to.be.true;

      // Act
      domNode.sendEvent( 'wheel', scrollEvent );

      // Assert
      const expectedCenter = new Vector2( 0.53, 0.53 );
      expect( ( viewport as any ).viewCenter.equals( expectedCenter ) ).to.be.true;
    } );
  } );
} );
