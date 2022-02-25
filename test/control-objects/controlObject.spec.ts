import { expect } from 'chai';
import * as sinon from 'sinon';

import { ControlObject, Group } from '../../lib';

class TestObject extends ControlObject {
  public constructor() {
    super();
  }
}

describe( 'ControlObject', (): void => {
  describe( 'constructor', (): void => {
    it( 'should call redraw method when points array changes', (): void => {
      // Arrange
      const controlObject = new TestObject();
      const spy = sinon.spy( controlObject, 'redraw' );

      // Act
      controlObject.points.initializeElements( 1 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'redraw', (): void => {
    it( 'should clear the child objects', (): void => {
      // Arrange
      const controlObject = new TestObject();
      const child = new Group();
      controlObject.appendChild( child );

      // Act
      controlObject.redraw();

      // Assert
      expect( controlObject.children.length ).to.equal( 0 );
    } );
  } );
} );
