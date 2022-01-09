import { expect } from 'chai';
import * as sinon from 'sinon';

import { ControlObject } from '../../lib';

class TestObject extends ControlObject {
  public constructor() {
    super();
  }
  public redraw(): void {}
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
} );
