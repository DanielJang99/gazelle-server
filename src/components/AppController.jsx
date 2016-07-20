import React from "react";
import FalcorController from "../lib/falcor/FalcorController";
import { setAppReady } from "lib/falcor/falcorUtils";
import Navigation from "components/Navigation";

// Importing static articles
import articles from "../../static/sample-issue/posts.js";

// Application CSS; applicationStyles alias,
// CSS, SCSS, and Style loaders in webpack.config.js
require('applicationStyles');

export default class AppController extends FalcorController {
  static getFalcorPath() {
    return (['appName']);
  }

  componentDidMount() {
    super.componentDidMount();
    setAppReady();
  }

  render() {
    return (
      <div>
        <Navigation appName={this.state.data.appName} />
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}
