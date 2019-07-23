import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './mainview.scss';

import ListProjects from '../ListProjects';
import CreateProject from '../CreateProject';
import ListInvestedProjects from '../ListInvestedProjects';
import api from '../../api';

import { BrowserRouter as Router, Redirect, Route, Switch, Link } from 'react-router-dom';

const { $ } = window;

class Header extends Component {


  constructor(props) {
    super();
    this.state = {
        selectedAccount: props.selectedAccount
    };

  }




  render() {
    return (
      <div className="center-align">



            <div className = "container infoBar">

              <p>{ `Account '${this.state.selectedAccount}'`}</p>

              <a className="waves-effect waves-light btn text-teal" styleName="selectAnotherAccountBtn" href="/">
                <i className="material-icons left">{ 'perm_identity' } </i>
                { 'Select another account' }
              </a>

              <Link to={`${this.props.match.url}/createProject`} className="waves-effect waves-light btn text-teal" styleName ="createProjectBtn">Create Project</Link>
              <Link to={`${this.props.match.url}/listProjects`} className="waves-effect waves-light btn text-teal" styleName ="listProjectBtn">List All Projects</Link>
              <Link to={`${this.props.match.url}/listInvestedProjects`} className="waves-effect waves-light btn text-teal" styleName ="listInvestedProjectsBtn">List your Invested Projects</Link>

              <hr />
              <Switch>
                <Route
                  exact
                  path={`${this.props.match.url}/listProjects`}
                  render={props => (
                    <ListProjects
                      selectedAccount={this.state.selectedAccount}
                      contractAddress={this.props.contractAddress}
                      {...props}
                    />
                  )}
                />
                <Route
                  path={`${this.props.match.url}/createProject`}
                  render={props => (
                    <CreateProject
                      selectedAccount={this.state.selectedAccount}
                      contractAddress={this.props.contractAddress}
                      {...props}
                    />
                  )}
                />
                <Route
                  path={`${this.props.match.url}/listInvestedProjects`}
                  render={props => (
                    <ListInvestedProjects
                      selectedAccount={this.state.selectedAccount}
                      contractAddress={this.props.contractAddress}
                      {...props}
                    />
                  )}
                />
              </Switch>
            </div>


      </div>
    );
  }
}





export default CSSModules(Header, styles, { allowMultiple: true });
