import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import App from './App';
import Page from './components/Page';

const Root = (props) => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={App}/>
      <Route path="/pages/" component={Page}/>
    </BrowserRouter>
  );
};

export default Root;
