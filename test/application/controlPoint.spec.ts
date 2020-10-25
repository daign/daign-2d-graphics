import { expect } from 'chai';

import { Matrix3, Vector2 } from '@daign/math';

import { Application, ControlObject, ControlPoint } from '../../lib';
import { TestContext } from '../testContext';

class TestObject extends ControlObject {
  public constructor() {
    super();
  }
  public redraw(): void {}
}

describe( 'ControlPoint', (): void => {
  describe( 'constructor', (): void => {
    it( 'should set the center from the transformed target point', (): void => {
      // Arrange
      const context = new TestContext();
      const targetPoint = new Vector2( 1, 2 );
      const targetTransformation = new Matrix3().setTranslation( new Vector2( 2, 3 ) );
      const application = new Application( context );
      const controlObject = new TestObject();

      // Act
      const controlPoint = new ControlPoint( targetPoint, targetTransformation, application,
        controlObject );

      // Assert
      expect( controlPoint.center.equals( new Vector2( 3, 5 ) ) ).to.be.true;
    } );
  } );
} );
