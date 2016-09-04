/**
 * App entry point
 */

// Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';

// CSS
import 'react-select/dist/react-select.css';
import 'fixed-data-table/dist/fixed-data-table.css';
import 'rc-slider/assets/index.css';
import './base.css';
require('font-awesome/css/font-awesome.css');

// Routes
import Routes from './Routes';

// ID of the DOM element to mount app on
const DOM_APP_EL_ID = 'app';

// Render the router
ReactDOM.render((
  <Router history={browserHistory}>
    {Routes}
  </Router>
), document.getElementById(DOM_APP_EL_ID));

