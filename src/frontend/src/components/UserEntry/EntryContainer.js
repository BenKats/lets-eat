import React, { Component } from "react";

import Entry from "./Entry";
class EntryContainer extends Component {
  state = {
    email: "",
    password: ""
  };
  emailChangeHandler = event => {
    console.log(event.target.value);
    this.setState({ email: event.target.value.toLowerCase() });
  };

  passwordChangeHandler = event => {
    console.log(event.target.value);
    this.setState({ password: event.target.value });
  };

  signupHandler = () => {
    console.log("signupHandler Called");
  };

  loginHandler = () => {
    console.log("loginHandler Called");
  };
  render() {
    return (
      <div>
        <Entry
          emailChangeHandler={this.emailChangeHandler}
          passwordChangeHandler={this.passwordChangeHandler}
          signupHandler={this.signupHandler}
          loginHandler={this.loginHandler}
        />
      </div>
    );
  }
}

export default EntryContainer;
