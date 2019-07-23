import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import MainView from './components/MainView';
import UserSelection from './components/UserSelection';
import api from './api';

const { localStorage } = window;

//How can we reuse this ? Tried to pass as param the Component we want to call(like MainView in this case) but didnt work

const Authenticate = ({ accounts, history, match , contractAddress }) => (
  accounts.some(acc => acc === match.params.account)
  ? <MainView account={match.params.account} contractAddress = {contractAddress} goBack={() => history.push('/')} match={match} />
  : <Redirect to={'/'} />
);


export default class Root extends Component {

  constructor() {
    super();
    this.state = {
      accounts: []
    };
  }

  componentWillMount() {
    this.setState({
      accounts: api.getAccounts()
    });
    // clear localStorage in browser console after restarting testrpc
    const address = localStorage.getItem('contractaddress');
    if (!address) {
      api.deploy().then(address => {
        localStorage.setItem('contractaddress', address);
        this.setState({ contractAdress: address });
      });
    } else {
      this.setState({ contractAdress: address });
    }

  }


  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path={'/'}
            render={props => (<UserSelection accounts={this.state.accounts} {...props} />)}
          />
          <Route
            path={'/:account'}
            render={props => (<Authenticate accounts={this.state.accounts} contractAddress ={this.state.contractAdress} {...props} />)}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
