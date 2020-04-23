import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';
import store from './store';
import { Provider } from 'react-redux';
import Schedule from './components/Schedule/Schedule';

ReactDOM.render(
    <Provider store={store}>
        <Schedule />
    </Provider> ,
    document.getElementById('root')
);
  