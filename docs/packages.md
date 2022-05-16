# daign-2d-graphics packages

The daign-2d-graphics project consists of several libraries that are all written in TypeScript
and can be downloaded as npm packages.

[List of all my packages on npm.][npm-daign-url]

### Foundation ###

+ **[daign-math][daign-math-url]** -
The math library for all vector and matrix calculations necessary.

+ **[daign-2d-pipeline][daign-2d-pipeline-url]** -
Transforms your shapes from world coordinates to screen coordinates.

+ **[daign-2d-graphics][daign-2d-graphics-url]** -
Defines shapes and how control points can modify them.

+ **[daign-style-sheets][daign-style-sheets-url]** -
A simple style sheet processor to define the color and style of graphic elements.
Because you can't use CSS together with Canvas or Ti*k*Z.

### Renderers ###

The renderers that output the graphics to the target format.

+ **[daign-2d-graphics-svg][daign-2d-graphics-svg-url]** -
Renders to SVG format for use in interactive web applications.

+ **[daign-2d-graphics-tikz][daign-2d-graphics-tikz-url]** -
Outputs [Ti*k*Z][tikz-url] code that can be used in LaTeX documents and compiled to PDF.

+ A renderer for the HTML5 canvas element is also planned.

Renderers can be extended or used as a base to write your own renderer for a different output format.

### Utils ###

+ **[daign-handle][daign-handle-url]** -
Defining drag actions for all DOM elements.

+ **[daign-schedule][daign-schedule-url]** -
Managing the time-wise execution of functions.
Mainly used for limiting the redraw cycle to increase performance.

+ **[daign-color][daign-color-url]** -
Color utils library.

+ **[daign-dom-pool][daign-dom-pool-url]** -
Helper for reusing DOM nodes to increase performance without relying on garbage collection.

+ **[daign-observable][daign-observable-url]** -
Simple implementation of observable pattern.

+ **[daign-mock-dom][daign-mock-dom-url]** -
Mocking DOM nodes and events for unit tests in Typescript.

[npm-daign-url]: https://www.npmjs.com/~daign

[daign-math-url]: https://github.com/daign/daign-math
[daign-2d-pipeline-url]: https://github.com/daign/daign-2d-pipeline
[daign-2d-graphics-url]: https://github.com/daign/daign-2d-graphics
[daign-style-sheets-url]: https://github.com/daign/daign-style-sheets

[daign-2d-graphics-svg-url]: https://github.com/daign/daign-2d-graphics-svg
[daign-2d-graphics-tikz-url]: https://github.com/daign/daign-2d-graphics-tikz

[daign-handle-url]: https://github.com/daign/daign-handle
[daign-schedule-url]: https://github.com/daign/daign-schedule
[daign-color-url]: https://github.com/daign/daign-color
[daign-dom-pool-url]: https://github.com/daign/daign-dom-pool
[daign-observable-url]: https://github.com/daign/daign-observable
[daign-mock-dom-url]: https://github.com/daign/daign-mock-dom

[tikz-url]: https://github.com/pgf-tikz/pgf
