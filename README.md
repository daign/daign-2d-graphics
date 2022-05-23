# daign-2d-graphics

[![CI][ci-icon]][ci-url]
[![Coverage][coveralls-icon]][coveralls-url]
[![NPM package][npm-icon]][npm-url]

#### Two dimensional graphics library for interactive web graphics.

daign-2d-graphics lets you define 2d-graphics that can be modified through control points.

The final graphics can be output to interactive web applications with technologies like SVG or Canvas,
but other output formats like [Ti*k*Z][tikz-url] code can also be defined.

## Demo ##

Here is a repository with [demo applications][demo-url].

## Documentation ##

daign-2d-graphics is the main package of several npm packages that work together to build this project.
[Learn more about the packages.](./docs/packages.md)

## Installation

```sh
npm install @daign/2d-graphics --save
```

## Scripts

```bash
# Build
npm run build

# Run lint analysis
npm run lint

# Run unit tests with code coverage
npm run test

# Get a full lcov report
npm run coverage
```

[ci-icon]: https://github.com/daign/daign-2d-graphics/workflows/CI/badge.svg
[ci-url]: https://github.com/daign/daign-2d-graphics/actions
[coveralls-icon]: https://coveralls.io/repos/github/daign/daign-2d-graphics/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/daign/daign-2d-graphics?branch=master
[npm-icon]: https://img.shields.io/npm/v/@daign/2d-graphics.svg
[npm-url]: https://www.npmjs.com/package/@daign/2d-graphics

[tikz-url]: https://github.com/pgf-tikz/pgf
[demo-url]: https://github.com/daign/daign-2d-graphics-examples
