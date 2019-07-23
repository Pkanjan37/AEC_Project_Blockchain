import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './userselection.scss';

import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

const { $ } = window;

class UserSelection extends Component {

  constructor(props) {
    super();
    this.state = {
      selectedAccount: props.accounts[0]
    };

    console.log(props)
  }

  componentDidMount() {
    $('#selectAccount').on('change', ({ target }) => {
      this.setState({ selectedAccount: target.value });
    });
  }

  componentWillUnmount() {
    $('#selectAccount').off();
  }

  render() {
    return (
      <div
        className="row center-align"
        styleName="mainContainer"
      >
        <div className="row center-align valign-wrapper">
          <h5 className="col s8"> Select a user account </h5>

          <a
            className="waves-effect waves-light btn col s4 text-teal"
            href={`${this.state.selectedAccount}`}
          >
            <i className="material-icons left">{ 'perm_identity' }</i>
            { 'Confirm' }
          </a>
        </div>
        <div className="input-field">
          <select id="selectAccount">
            {
              this.props.accounts.map(account => (
                <option
                  key={account}
                  value={account}
                >
                  { account }
                </option>
              ))
            }
          </select>
        </div>
      </div>
    );
  }
}

export default CSSModules(UserSelection, styles, { allowMultiple: true });
