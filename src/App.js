import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/pages/Home";
import Posts from "./components/pages/Posts";
import "./index.css";

function NotFound() {
  return <h1>Page Not Found</h1>;
}

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/posts" component={Posts} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
