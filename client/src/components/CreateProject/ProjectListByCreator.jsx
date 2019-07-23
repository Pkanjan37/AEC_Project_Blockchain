import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './mainview.scss';

class ProjectListByCreator extends Component {
  render() {
    return (
      <div className="container">
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
                  <th>Cancel Project</th>
                  <th>Withdraw Funds</th>
                </tr>
              </thead>

              <tbody>
                {
                  this.props.projects.map((project) => (
                    <tr key={project.project_id}>
                      <td>{project.title}</td>
                      <td>{project.description}</td>
                      <td>{project.current_funding}</td>
                      <td>{project.funding_goal}</td>
                      <td>{project.deadline}</td>
                      <td>
                        <a
                          className="waves-effect btn"
                          styleName="cancelBtn"
                          onClick={() => this.props.onCancelProject(project.project_id)}
                        >
                          Cancel
                        </a>
                      </td>
                      <td>
                        <a
                          className="waves-effect btn"
                          styleName="cancelBtn"
                          onClick={() => this.props.onWithdrawFunds(project.project_id)}
                        >
                          Withdraw
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

export default CSSModules(ProjectListByCreator, styles, { allowMultiple: true });
