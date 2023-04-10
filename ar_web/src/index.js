/*!

=========================================================
* Argon Design System React - v1.1.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";

import Index from "views/Index.js";
import Landing from "views/examples/Landing.js";
import Login from "views/examples/Login.js";
import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";
import Museums from "views/examples/Museums";
import Artifacts from "views/examples/Artifacts";
import ArtifactEditor from "views/examples/ArtifactEditor";

const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
  <BrowserRouter basename="build">
    <Switch>
      <Route path="/" exact render={(props) => <Index {...props} />} />
      <Route
        path="/landing-page"
        exact
        render={(props) => <Landing {...props} />}
      />
      <Route
        path="/login-page"
        exact
        render={(props) => <Login {...props} ref={Login => {window.Login = Login}}/>}
      />
      <Route
        path="/profile-page"
        exact
        render={(props) => <Profile {...props} />}
      />
      <Route
        path="/register-page"
        exact
        render={(props) => <Register {...props} />}
      />
      <Route
        path="/museums-page"
        exact
        render={(props) => <Museums {...props} ref={Museums => {window.Museums = Museums}} />}
      />
       <Route
        path="/artifacts-page"
        exact
        render={(props) => <Artifacts {...props} ref={Artifacts => {window.Artifacts = Artifacts}} />}
      />
        <Route
        path="/artifact-editor-page"
        exact
        render={(props) => <ArtifactEditor {...props} ref={ArtifactEditor => {window.ArtifactEditor = ArtifactEditor}} />}
      />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>
);
