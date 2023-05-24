# Redraw cycle - daign-2d-graphics

In a daign-2d-graphics application some components
will automatically keep track of changes and update themselves, and some won't.
Here is what you need to know about bringing changes from the document to the screen.

## Internal update mechanisms

When adding or removing nodes to the document tree
or when changing transformations on nodes,
then the projection matrices are updated automatically.
See [daign-2d-pipeline documentation](https://github.com/daign/daign-2d-pipeline/blob/master/docs/change-notifications.md).

Assigning or changing class names on a StyledGraphicNode will build the style selector,
which will be evaluated during the rendering process.

## The redraw cycle

A redraw of the application consists of the following steps:
1. The redraw is requested by calling application.redraw().
2. A redraw event is send to custom components that have subscribed to the event,
to get informed before a redraw is executed.
3. The control layer is redrawn.
4. The callback to your custom render function is called.

For some predefined user actions a redraw is executed automatically.
But for most functions that you add to the application
you will have to call the redraw yourself.
This way you can execute multiple changes to the document
and render the application only once when you are finished.

### Automatic redraws

Automatic redraws happen on the following predefined user actions:
1. Selecting a control object.
2. Selecting a control point.
3. [Dragging a control point](./control-objects.md#control-point-changes).
4. Panning or zooming the view.
5. Clicking in an empty area to deselect.

### Manual redraws

In the following cases you have to call the redraw manually if needed:
1. In the callback of a button object.
2. When changing the selection programmatically.
3. When changing the view programmatically, for example when calling fitToContent().
4. After making changes to the document, e.g. appending or removing nodes from the document tree,
changing transformations, changing style selectors.

## Reacting to selection changes

Normally you don't act on selection changes specifically.
If your components should react to actions that they are not directly affected by,
they should subscribe to the redraw event with the updateMananger.subscribeToRedrawEvent() method.

However it is also possible to subscribe to the selection manager if needed.
