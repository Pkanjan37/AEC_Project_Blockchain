import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './mainview.scss';

import Header from '../Header';


import { BrowserRouter as Router, Redirect, Route, Switch, Link } from 'react-router-dom';

class MainView extends Component {


  constructor(props) {
    super();
    this.state = {
      selectedAccount: props.account,
      path: props.match.url
    };


  }

  render() {
    return (

      <div>
          <Header selectedAccount={this.props.account} {...this.props}></Header>

      </div>





    )
  }

}




export default CSSModules(MainView, styles, { allowMultiple: true });
