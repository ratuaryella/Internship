import React, { Component } from "react";
import IssueDataService from "../services/service";

export default class AddIssue extends Component {
  constructor(props) {
    super(props);
    this.onChangeLabel = this.onChangeLabel.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangePriority = this.onChangePriority.bind(this);
    this.saveIssue = this.saveIssue.bind(this);
    this.newIssue = this.newIssue.bind(this);

    this.state = {
      id: null,
      label: "",
      status: "", 
      priority: ""

    };
  }

  onChangeLabel(e) {
    this.setState({
      label: e.target.value
    });
  }

  onChangeStatus(e) {
    this.setState({
      status: e.target.value
    });
  }

  onChangePriority(e) {
    this.setState({
      priority: e.target.value
    });
  }

  saveIssue() {
    var data = {
      label: this.state.label,
      status: this.state.status,
      priority: this.state.priority
    };

    IssueDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          label: response.data.label,
          status: response.data.status,
          priority: response.data.priority,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newIssue() {
    this.setState({
      id: null,
      title: "",
      description: "",
      priority: ""
    });
  }

  render() {
    return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newIssue}>
                Add
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="label">Label</label>
                <input
                  type="text"
                  className="form-control"
                  id="label"
                  required
                  value={this.state.label}
                  onChange={this.onChangeLabel}
                  name="label"
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <input
                  type="text"
                  className="form-control"
                  id="status"
                  required
                  value={this.state.status}
                  onChange={this.onChangeStatus}
                  name="status"
                />
              </div>

              <div className="form-group">
                <label htmlFor="priority">Priority</label>
                <input
                  type="text"
                  className="form-control"
                  id="priority"
                  required
                  value={this.state.priority}
                  onChange={this.onChangePriority}
                  name="priority"
                />
              </div>
  
              <button onClick={this.saveIssue} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      );
    }
  }