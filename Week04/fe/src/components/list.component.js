import React, { Component } from "react";
import IssueDataService from "../services/service";
import { Link } from "react-router-dom";

export default class IssuesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchLabel = this.onChangeSearchLabel.bind(this);
    this.retrieveIssues = this.retrieveIssues.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveIssue = this.setActiveIssue.bind(this);
    this.removeAllIssues = this.removeAllIssues.bind(this);
    this.searchLabel = this.searchLabel.bind(this);

    this.state = {
      issues: [],
      currentIssue: null,
      currentIndex: -1,
      searchLabel: ""
    };
  }

  componentDidMount() {
    this.retrieveIssues();
  }

  onChangeSearchLabel(e) {
    const searchLabel = e.target.value;

    this.setState({
      searchLabel: searchLabel
    });
  }

  retrieveIssues() {
    IssueDataService.getAll()
      .then(response => {
        this.setState({
          issues: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveIssues();
    this.setState({
      currentIssue: null,
      currentIndex: -1
    });
  }

  setActiveIssue(issue, index) {
    this.setState({
      currentIssue: issue,
      currentIndex: index
    });
  }

  removeAllIssues() {
    IssueDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchLabel() {
    IssueDataService.findByTitle(this.state.searchLabel)
      .then(response => {
        this.setState({
          issues: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchLabel, issues, currentIssue, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by label"
              value={searchLabel}
              onChange={this.onChangeSearchLabel}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchLabel}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Issues List</h4>

          <ul className="list-group">
            {issues &&
              issues.map((issue, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveIssue(issue, index)}
                  key={index}
                >
                  {issue.label}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllIssues}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentIssue ? (
            <div>
              <h4>Issue</h4>
              <div>
                <label>
                  <strong>Label:</strong>
                </label>{" "}
                {currentIssue.label}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentIssue.status}
              </div>
              <div>
                <label>
                  <strong>Priority:</strong>
                </label>{" "}
                {currentIssue.priority}
              </div>
              <Link
                to={"/issues/" + currentIssue.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on an Issue...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}