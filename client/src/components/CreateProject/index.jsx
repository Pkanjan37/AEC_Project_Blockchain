import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './mainview.scss';


import ProjectListByCreator from './ProjectListByCreator';
import api from '../../api';

class CreatorsView extends Component {

  constructor() {
    super();
    this.state = {
      project_title: '',
      project_description: '',
      funding_goal: '',
      deadline: '',
      creatorProjects: []
    };
  }

  componentDidMount() {
    this.getCreatorViewProject();
  }


  onInputChanged({ name, value }) {
    this.setState({
      [name]: value
    });
  }

  onCreateBtnPressed() {

    api.createProject(
      this.props.contractAddress,
      this.props.selectedAccount,
      this.state.project_title,
      this.state.project_description,
      this.state.funding_goal,
      this.state.deadline
    )
    .then(() => this.getCreatorViewProject());
    console.log(this.state.deadline);
  }

  onCancelProject(projectId) {
    api.refund(this.props.contractAddress, this.props.selectedAccount, projectId)
    .then(() => this.getCreatorViewProject());
  }

  onWithdrawFunds(projectId) {
    api.withdraw(this.props.contractAddress, this.props.selectedAccount, projectId)
    .then(() => this.getCreatorViewProject());
  }

  getCreatorViewProject() {
    this.setState({
      creatorProjects: api.creatorViewProject(
        this.props.contractAddress,
        this.props.selectedAccount
      )
    });
  }



  render() {
    return (
      <div className="center-align">
        <div className="container createProject" styleName="createProject">
          <h5 styleName="title">Create Project</h5>
          <form className="col s12">
            <div className="row">

              <div className="input-field col m6 s12">
                <input
                  name="project_title"
                  type="text"
                  value={this.state.project_title}
                  onChange={e => this.onInputChanged(e.target)}
                />
                <label htmlFor="project_title">
                  Project Title
                </label>
              </div>
              <div className="input-field col m6 s12">
                <input
                  name="project_description"
                  type="text"
                  value={this.state.project_description}
                  onChange={e => this.onInputChanged(e.target)}
                />
                <label htmlFor="project_description">Project Description</label>
              </div>
              <div className="input-field col m6 s12">
                <input
                  name="funding_goal"
                  type="text"
                  value={this.state.funding_goal}
                  onChange={e => this.onInputChanged(e.target)}
                />
                <label htmlFor="funding_goal">
                  Funding Goal
                </label>
              </div>
              <div className="input-field col m6 s12">
                <input
                  type="datetime-local"
                  name="deadline"
                  value = {this.state.deadline}
                  onChange = {e => this.onInputChanged(e.target)}
                ></input>
              </div>

            </div>
            <div className="row">
              <a
                className="waves-effect waves-light btn"
                styleName="createBtn"
                onClick={e => this.onCreateBtnPressed(e.target)}
              >
                { 'Submit' }
              </a>
            </div>
          </form>

          <br></br>
          <br></br>
          <hr></hr>
          <h5 styleName="title">List The Projects You Created</h5>

          <ProjectListByCreator
            onCancelProject={projectId => this.onCancelProject(projectId)}
            onWithdrawFunds={projectId => this.onWithdrawFunds(projectId)}
            projects={this.state.creatorProjects}
          />
        </div>

      </div>
    );
  }
}

export default CSSModules(CreatorsView, styles, { allowMultiple: true });
