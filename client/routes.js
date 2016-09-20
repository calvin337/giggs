import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers/mainReducer';
import App from './app.js';
import SignUp from './components/signUp';
import CreateJob from './components/createJob';

//Basic routing, to add another route just do:
//<Route path='/insertUrl' component={insertComponentName} />
const createStoreWithMiddleWare = applyMiddleware(thunk)(createStore);
console.log('rootReducer', rootReducer);
export const store = createStoreWithMiddleWare(rootReducer, window.devToolsExtension ? window.devToolsExtension() : f => f);

render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App} />
      <Route path='signup' component={SignUp} />
      <Route path='createjob' component={CreateJob} />
    </Router>
  </Provider>
), document.getElementById('app'));
