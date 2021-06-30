import React, { Component, Fragment } from 'react';
import { Route, Router } from 'react-router';
import { ByteNum } from './components/ByteNum';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render() {
    return <Fragment>
      <ByteNum/>
    </Fragment>;
  }
}
