import { expect } from 'chai';

import { StringValue, Vector2 } from '@daign/math';
import { View } from '@daign/2d-pipeline';

import { Application, ControlObject, SelectionFrame, TwoPointRectangle } from '../../lib';

import { TestContext } from '../testContext';

class TestObject extends ControlObject {
  public constructor() {
    super();
  }
}

describe( 'SelectionFrame', (): void => {
  describe( 'redraw', (): void => {
    it( 'should return a TwoPointRectangle with selection-frame class', (): void => {
      // Arrange
      const context = new TestContext();
      const application = new Application( context );

      const view = new View();
      view.mountNode( application );

      const controlObject = new TestObject();
      controlObject.points.push( new Vector2( 1, 2 ) );
      application.drawingLayer.appendChild( controlObject );

      const selectionFrame = new SelectionFrame();

      // Act
      const node = selectionFrame.redraw( controlObject );

      // Assert
      expect( node instanceof TwoPointRectangle ).to.be.true;
      expect( ( node as any ).classNames.elements
        .some( ( x: StringValue ): boolean => {
          return x.value === 'selection-frame';
        } )
      ).to.be.true;
    } );
  } );
} );
