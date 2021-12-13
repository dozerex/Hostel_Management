import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Login from "./Authentication/Login";
import AuthenticatedRoute from "./Route/AuthenticatedRoute";
import ForgotPassword from "./Authentication/ForgotPassword";
import UpdateProfile from "./Profile/UpdateProfile";
import { StudentList } from "./Student/StudentList";
import { ComplaintList } from "./Complaint/ComplaintList";
import { Contact } from "./Complaint/ComplainForm";
import { NavigationHeader } from "../Headers/NavigationHeader";
import { OutpassForm } from "./Outpass/OutpassForm";


import UnauthenticatedRoute from "./Route/UnauthenticatedRoute";

import "./App.css";
import { OutpassList } from "./Outpass/OutpassList";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <UnauthenticatedRoute path="/login" component={Login} />
          <UnauthenticatedRoute path="/forgot-password" component={ForgotPassword} />
          
          <>
            <NavigationHeader />
            <AuthenticatedRoute exact path="/" component={Dashboard} />
            <AuthenticatedRoute path="/update-profile" component={UpdateProfile} />
            <AuthenticatedRoute path="/student-list" component={StudentList} />
            <AuthenticatedRoute path="/complaint-list" component={ComplaintList} />
            <AuthenticatedRoute path="/complaint-form" component={Contact} />
            <AuthenticatedRoute path="/outpass-form" component={OutpassForm} />
            <AuthenticatedRoute path="/outpass-list" component={OutpassList} />
          </>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
