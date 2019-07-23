import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './mainview.scss';

import api from '../../api';

const { $ } = window;

class ListProjects extends Component {

  constructor(props) {
    super();
    this.state = {
      selectedAccount: props.selectedAccount,
      projects:[],
      investInputValues: []
    };

  }



  componentDidMount() {
    console.log("list of projects component is being mounted ");
    this.getProjectList();
  }

  getProjectList() {
    console.log("list of projects ");
    this.setState({ projects: api.listAllProject(this.props.contractAddress) });
  }

  onInvestBtnPressed(projectId) {
    const value = this.state.investInputValues[projectId];
    console.log(value)
    api.invest(this.props.contractAddress, this.state.selectedAccount, projectId, value)
    .then(() => this.getProjectList())
    .catch(err => console.error(err));
  }


  onAmountChanged(projectId, value) {
    console.log(value)
    const { investInputValues } = this.state;
    investInputValues[projectId] = value;
    this.setState({ investInputValues });
  }


  render() {
    return (
      <div className="container">

        <h5 styleName="title">List All Projects</h5>
        <p>{ `Balance: '${api.getMyBalance(this.state.selectedAccount)}'`}</p>

        <div className="section">

          <div className="row">
            <table className="striped centered">
              <thead>
                <tr>
                    <th>Project Name</th>
                    <th>Project Description</th>
                    <th>Funding Status</th>
                    <th>Funding Goal</th>
                    <th>Deadline</th>
                    <th>Invest Amount</th>
                    <th>Invest</th>
                </tr>
              </thead>

              <tbody>

                { this.state.projects.map((project, i) => (
                    <tr key={i}>
                      <td>{project.title}</td>
                      <td>{project.description}</td>
                      <td>{project.current_funding}</td>
                      <td>{project.funding_goal}</td>
                      <td>{project.deadline}</td>
                      <td>
                        <input
                          name={project.project_id}
                          type="text"
                          value={this.state.investment}
                          onChange={e => this.onAmountChanged(project.project_id, e.target.value)}
                        />
                      </td>
                      <td>
                        <a
                          className="waves-effect btn"
                          styleName="investBtn"
                          onClick={() => this.onInvestBtnPressed(project.project_id)}
                        >
                          Invest
                        </a>
                      </td>
                    </tr>
                  ))
                }


              </tbody>

            </table>
          </div>

        </div>
      </div>

    );
  }
}

export default CSSModules(ListProjects, styles, { allowMultiple: true });
