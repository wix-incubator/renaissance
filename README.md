# Renaissance.js
A [Redux](https://redux.js.org/) middleware for handling business logic

This project was influenced by the absolutely amazing library [redux-saga](https://redux-saga.js.org/)
and by how we, in our team at Wix, have been using sagas.

During our time working on numerous projects we've realized how powerful it was to use the combination of `react`, `redux` and `redux-saga`.
These three libraries gave us the ability to have a (almost) complete decoupling between our view and business logic.

On how to get this decoupling working right, read about the RRR paradigm [here](./RRR.md)

## How to Install
```sh
npm install --save renaissance
```

## How to use
The most simple example:

```javascript
import { createStore, applyMiddleware } from 'redux';
import createMiddleware from 'renaissance';

const INITIAL_STATE = {
  foo: 'bar'
};
const myReducer = (state = INITIAL_STATE, action) => {
  ...
  // do reducer stuff
  ...
};
const myMiddleware = {
  MY_ACTION: {
    handler: (action) => {
       ...
       // do middleware stuff
       ...
     };
  }
}

const store = createStore(
  reducer,
  INITIAL_STATE,
  applyMiddleware(createMiddleware(myMiddleware))
);
```


