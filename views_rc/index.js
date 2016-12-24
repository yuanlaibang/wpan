import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory,browserHistory } from 'react-router';
import './styles/index.less';
import Routes from './routes';

ReactDOM.render(
  <Routes />,
  document.getElementById('app')
)