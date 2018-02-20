import React from 'react';
import ReactDOM from 'react-dom';
import WebFont from 'webfontloader';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import AuthService from './services/AuthService';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

WebFont.load({
  google: {
    families: ['Signika:300,400,700', 'sans-serif'],
  },
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
registerServiceWorker();
AuthService.connect();
