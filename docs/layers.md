# Layers - daign-2d-graphics

A daign-2d-graphics application typically consists of two layers:
the drawing layer and the control layer.
Unless the application is non-interactive,
in which case there is no control layer.

## Drawing layer

The drawing layer contains the graphic or document that you want to draw.
The top most object of the drawing layer is the viewport,
which is just a group object with transformations
that facilitate zooming and panning of the application.

## Control layer

The control layer shows the controls that help manipulating the graphic.
There are three categories of elements on the control layer:

+ **Control points** are handles that allow manipulating the graphic.
For example a line [control object](./control-objects.md)
will display two handle points to manipulate the end points of the line.
+ **Button controls** are buttons and can handle click events.
+ **Control guides** for non-interactive graphical helper elements.

Objects on the control layer are not affected by zooming.
They will adjust their position according to the graphic elements below,
but will always stay the same size.
The main reason for this is, that handles should always be easily clickable,
so should not scale with the zooming.

## Custom layers

It is possible to add further layers to the application.
This can be useful for adding user interface objects
that should not scale with the zooming of the graphic.

However for organizing the main graphic into layers
one should use group objects inside of the drawing layer.
