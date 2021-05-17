import React, { Component } from "react";
import IssueDataService from "../services/service";

export default class Issue extends Component {
  constructor(props) {
    super(props);
    this.onChangeLabel = this.onChangeLabel.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangePriority = this.onChangePriority.bind(this);
    this.getIssue = this.getIssue.bind(this);
    this.updateIssue = this.updateIssue.bind(this);
    this.deleteIssue = this.deleteIssue.bind(this);

    this.state = {
      currentIssue: {
        id: null,
        label: "",
        status: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getIssue(this.props.match.params.id);
  }

  onChangeLabel(e) {
    const label = e.target.value;

    this.setState(function(prevState) {
      return {
        currentIssue: {
          ...prevState.currentIssue,
          label: label
        }
      };
    });
  }

  onChangeStatus(e) {
    const status = e.target.value;
    
    this.setState(prevState => ({
      currentTIssue: {
        ...prevState.currentIssue,
        status: status
      }
    }));
  }

  onChangePriority(e) {
    const priority = e.target.value;
    
    this.setState(prevState => ({
      currentIssue: {
        ...prevState.currentIssue,
        priority: priority
      }
    }));
  }

  getIssue(id) {
    IssueDataService.get(id)
      .then(response => {
        this.setState({
          currentIssue: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateIssue() {
    IssueDataService.update(
      this.state.currentIssue.id,
      this.state.currentIssue
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The issue was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteIssue() {    
    IssueDataService.delete(this.state.currentIssue.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/issues')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentIssue } = this.state;

    return (
      <div>
        {currentIssue ? (
          <div className="edit-form">
            <h4>Issue</h4>
            <form>
              <div className="form-group">
                <label htmlFor="label">Label</label>
                <input
                  type="text"
                  className="form-control"
                  id="label"
                  value={currentIssue.label}
                  onChange={this.onChangeLabel}
                />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <input
                  type="text"
                  className="form-control"
                  id="status"
                  value={currentIssue.status}
                  onChange={this.onChangeStatus}
                />
              </div>
              <div className="form-group">
                <label htmlFor="status">Priority</label>
                <input
                  type="text"
                  className="form-control"
                  id="priority"
                  value={currentIssue.priority}
                  onChange={this.onChangePriority}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteIssue}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateIssue}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Issue...</p>
          </div>
        )}
      </div>
    );
  }
}