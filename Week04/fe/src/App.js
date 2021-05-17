import React, { Component } from "react";
import {Link, Switch, Route} from 'react-router-dom';
import "./bootstrap/dist/css/bootstrap.min.css";
import IssuesList from "./components/list.component.js";
import AddIssue from "./components/add.component.js";
import Issue from "./components/item.component.js";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/issues" className="navbar-brand">
            bezKoder
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/issues"} className="nav-link">
                Issues
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/issues"]} component={IssuesList} />
            <Route exact path="/add" component={AddIssue} />
            <Route path="/issues/:id" component={Issue} />
          </Switch>
        </div>
      </div>
    );
  }
}


export default App;