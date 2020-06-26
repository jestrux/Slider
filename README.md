# Slider

> Simple way to make Slides and slideshows on the web.

## Simple Usage

```javascript
const slider = new Slider("#slideshowContainer");

// if you want it to play automatically add
slider.play();

See sample code [here](demo/index.html)
```

## Developer environment requirements

To run this project, you will need:

- Node.js >= v10.5.0, use nvm - [install instructions](https://github.com/creationix/nvm#install-script)
- Yarn >= v1.7.0 - [install instructions ("Alternatives" tab)](https://yarnpkg.com/en/docs/install#alternatives-rc)

## Running tests

```sh
yarn
yarn test
yarn test --watch
```

## Dev mode

When developing you can run:

```
yarn watch
```

This will regenerate the build files each time a source file is changed and serve on http://127.0.0.1:5000.

### Previewing umd build in the browser

If your package works in the browser, you can open `dev/index.html` to try it out.

## Publishing

```sh
npm publish
```

## Additional tooling

Based on your need, you might want to add:
- [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/)
- [TypeScript](https://www.typescriptlang.org/) support
- Monorepo support with [Lerna](https://lernajs.io/)
- CHANGELOG.md generation with [conventional-changelog](https://github.com/conventional-changelog)

If so, please do and open pull requests when you feel like it.