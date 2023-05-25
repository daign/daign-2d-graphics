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
* Selecting a control object.
* Selecting a control point.
* [Dragging a control point](./control-objects.md#control-point-changes).
* Panning or zooming the view.
* Clicking in an empty area to deselect.

### Manual redraws

In the following cases you have to call the redraw manually if needed:
* In the callback of a button object.
* When changing the selection programmatically.
* When changing the view programmatically, for example when calling fitToContent().
* After making changes to the document, e.g. appending or removing nodes from the document tree,
changing transformations, changing style selectors.

Make sure to always call the redraw at the end of the top most function
that executes your action, and only there.
If you request a redraw from within a method that redraws or updates a component,
then this can lead to infinite circular redraws,
when the same component also updates on other actions.

## Events

There are two events that can be useful for updating components.

### Selection changes

You can subscribe to the selection manager
in case a component should update when the selection changes.
Since the action which initiated the selection change is responsible
for requesting a redraw,
you should not request another redraw in response to a selection change event.

### The redraw event

Components which are not linked directly to react on changes in other components,
and which also depend on more than just selection changes,
can subscribe to the redraw event by calling the updateMananger.subscribeToRedrawEvent() method.
This means they will be informed first for each redraw that is requested.
So in other words they will update on every possible change in the application.
