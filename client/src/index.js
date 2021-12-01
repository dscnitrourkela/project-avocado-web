import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BrowserRouter basename="/admin">
    <App />
  </BrowserRouter>
, document.getElementById('root'));

serviceWorker.unregister();