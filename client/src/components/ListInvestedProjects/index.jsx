import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './mainview.scss';

import api from '../../api';

class ListInvestedProjects extends Component {
  render() {console.log(this.props)
    const projects = api.viewInvestedProject(
      this.props.contractAddress,
      this.props.selectedAccount
    );

    console.log(projects)

    return (
      <div className="container">
        <div className="section">
          <h5 styleName="title">List The Projects You Invested</h5>
          <div className="row">
            <table className="striped centered">
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Project Description</th>
                  <th>Funding Status</th>
                  <th>Share Token (%)</th>
                  <th>Deadline</th>
                </tr>
              </thead>
              <tbody>
                {
                  projects.map((project, i) => (
                    <tr key={i}>
                      <td>{project.title}</td>
                      <td>{project.description}</td>
                      <td>{project.current_funding}</td>
                      <td>{api.getShare(
                          this.props.contractAddress,
                          this.props.selectedAccount,
                          project.project_id
                        )}
                      </td>
                      <td>{project.deadline}</td>
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

export default CSSModules(ListInvestedProjects, styles, { allowMultiple: true });
