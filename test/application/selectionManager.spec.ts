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
    it( 'should set the active object and point', (): void => {
      // Arrange
      const selectionManager = new SelectionManager();
      const targetPoint = new Vector2( 1, 2 );
      const controlObject = new TestObject();
      controlObject.points.push( targetPoint );

      // Act
      selectionManager.setSelection( controlObject, targetPoint );

      // Assert
      expect( selectionManager.activeObject ).to.equal( controlObject );
      expect( selectionManager.activePoint ).to.equal( targetPoint );
    } );

    it( 'should allow setting the selection to null', (): void => {
      // Arrange
      const selectionManager = new SelectionManager();
      const targetPoint = new Vector2( 1, 2 );
      const controlObject = new TestObject();
      controlObject.points.push( targetPoint );
      selectionManager.setSelection( controlObject, targetPoint );

      // Act
      selectionManager.setSelection( null, null );

      // Assert
      expect( selectionManager.activeObject ).to.equal( null );
      expect( selectionManager.activePoint ).to.equal( null );
    } );

    it( 'should call notifyObservers', (): void => {
      // Arrange
      const selectionManager = new SelectionManager();
      const targetPoint = new Vector2( 1, 2 );
      const controlObject = new TestObject();
      controlObject.points.push( targetPoint );
      const observerSpy = spy( selectionManager as any, 'notifyObservers' );

      // Act
      selectionManager.setSelection( controlObject, targetPoint );

      // Assert
      expect( observerSpy.calledOnce ).to.be.true;
    } );

    it( 'should not call notifyObservers when nothing changes', (): void => {
      // Arrange
      const selectionManager = new SelectionManager();
      const targetPoint = new Vector2( 1, 2 );
      const controlObject = new TestObject();
      controlObject.points.push( targetPoint );
      selectionManager.setSelection( controlObject, targetPoint );
      const observerSpy = spy( selectionManager as any, 'notifyObservers' );

      // Act
      selectionManager.setSelection( controlObject, targetPoint );

      // Assert
      expect( observerSpy.notCalled ).to.be.true;
    } );

    it( 'should not change selection when a point is passed without an object', (): void => {
      // Arrange
      const selectionManager = new SelectionManager();
      const targetPoint = new Vector2( 1, 2 );
      const targetPoint2 = new Vector2( 1, 3 );
      const controlObject = new TestObject();
      controlObject.points.push( targetPoint );
      controlObject.points.push( targetPoint2 );
      selectionManager.setSelection( controlObject, targetPoint );

      // Act
      selectionManager.setSelection( null, targetPoint2 );

      // Assert
      expect( selectionManager.activeObject ).to.equal( controlObject );
      expect( selectionManager.activePoint ).to.equal( targetPoint );
    } );

    it( 'should not change selection when point is not contained in object', (): void => {
      // Arrange
      const selectionManager = new SelectionManager();
      const targetPoint = new Vector2( 1, 2 );
      const targetPoint2 = new Vector2( 1, 3 );
      const controlObject = new TestObject();
      controlObject.points.push( targetPoint );
      selectionManager.setSelection( controlObject, targetPoint );

      // Act
      selectionManager.setSelection( controlObject, targetPoint2 );

      // Assert
      expect( selectionManager.activeObject ).to.equal( controlObject );
      expect( selectionManager.activePoint ).to.equal( targetPoint );
    } );
  } );
} );
