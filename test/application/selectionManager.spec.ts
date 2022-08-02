import { expect } from 'chai';
import { spy } from 'sinon';

import { Vector2 } from '@daign/math';

import { ControlObject, SelectionManager } from '../../lib';

class TestObject extends ControlObject {
  public constructor() {
    super();
  }
}

describe( 'SelectionManager', (): void => {
  describe( 'setSelection', (): void => {
    it( 'should set the active object and point index', (): void => {
      // Arrange
      const selectionManager = new SelectionManager();
      const targetPoint = new Vector2( 1, 2 );
      const controlObject = new TestObject();
      controlObject.points.push( targetPoint );

      // Act
      selectionManager.setSelection( controlObject, 0 );

      // Assert
      expect( selectionManager.activeObject ).to.equal( controlObject );
      expect( selectionManager.activePointIndex ).to.equal( 0 );
    } );

    it( 'should allow setting the selection to null', (): void => {
      // Arrange
      const selectionManager = new SelectionManager();
      const targetPoint = new Vector2( 1, 2 );
      const controlObject = new TestObject();
      controlObject.points.push( targetPoint );
      selectionManager.setSelection( controlObject, 0 );

      // Act
      selectionManager.setSelection( null, null );

      // Assert
      expect( selectionManager.activeObject ).to.equal( null );
      expect( selectionManager.activePointIndex ).to.equal( null );
    } );

    it( 'should call notifyObservers', (): void => {
      // Arrange
      const selectionManager = new SelectionManager();
      const targetPoint = new Vector2( 1, 2 );
      const controlObject = new TestObject();
      controlObject.points.push( targetPoint );
      const observerSpy = spy( selectionManager as any, 'notifyObservers' );

      // Act
      selectionManager.setSelection( controlObject, 0 );

      // Assert
      expect( observerSpy.calledOnce ).to.be.true;
    } );

    it( 'should not call notifyObservers when nothing changes', (): void => {
      // Arrange
      const selectionManager = new SelectionManager();
      const targetPoint = new Vector2( 1, 2 );
      const controlObject = new TestObject();
      controlObject.points.push( targetPoint );
      selectionManager.setSelection( controlObject, 0 );
      const observerSpy = spy( selectionManager as any, 'notifyObservers' );

      // Act
      selectionManager.setSelection( controlObject, 0 );

      // Assert
      expect( observerSpy.notCalled ).to.be.true;
    } );

    it( 'should not change selection when a point index is passed without an object', (): void => {
      // Arrange
      const selectionManager = new SelectionManager();
      const targetPoint = new Vector2( 1, 2 );
      const controlObject = new TestObject();
      controlObject.points.push( targetPoint );
      selectionManager.setSelection( controlObject, 0 );

      // Act
      selectionManager.setSelection( null, 2 );

      // Assert
      expect( selectionManager.activeObject ).to.equal( controlObject );
      expect( selectionManager.activePointIndex ).to.equal( 0 );
    } );

    it( 'should not change selection when point index is out of bounds', (): void => {
      // Arrange
      const selectionManager = new SelectionManager();
      const targetPoint = new Vector2( 1, 2 );
      const controlObject = new TestObject();
      controlObject.points.push( targetPoint );
      selectionManager.setSelection( controlObject, 0 );

      // Act
      selectionManager.setSelection( controlObject, 2 );

      // Assert
      expect( selectionManager.activeObject ).to.equal( controlObject );
      expect( selectionManager.activePointIndex ).to.equal( 0 );
    } );
  } );
} );
