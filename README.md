# react-chrome-extension-router

> A dead simple routing solution for browser extensions

[![NPM](https://img.shields.io/npm/v/react-chrome-extension-router.svg)](https://www.npmjs.com/package/react-chrome-extension-router) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-chrome-extension-router
```

## Usage

```jsx
import * as React from 'react';
import * as ReactDOM from 'ReactDOM';
import { Router, Link, goBack, goTo } from 'react-chrome-extension-router';

const Three = ({ finalMessage }) => <h1>{finalMessage}</h1>;

const Two = ({ message }) => (
  <div>
    This is component Two.
    I was passed a message:
    <p>{message}</p>

    <button onClick={() => goBack()}>
      Click me to go back to component One
    </button>

    <button onClick={() => goTo(Three, { finalMessage: 'I came from component two!' })}>
      Click me to go to component Three!
    </button>
  </div>
);

const One = () => (
  <Link component={Two} props={{ message: 'I came from component one!'}}>
    This is component One.  Click me to route to component Two
  </Link>
);

const App = () => (
  <Router>
    <One/>
  </Router>
);

render(App, document.getElementById('app'));

```
[![Edit agitated-satoshi-sccqr](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/agitated-satoshi-sccqr?fontsize=14)

## License

MIT © [kelsonpw](https://github.com/kelsonpw)
