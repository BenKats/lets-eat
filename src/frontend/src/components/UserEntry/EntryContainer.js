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
    this.fetchSignup();
    this.props.tokenHandler(window.sessionStorage.getItem("token"));
  };

  loginHandler = () => {
    console.log("loginHandler Called");
    this.fetchLogin();
    this.props.tokenHandler(window.sessionStorage.getItem("token"));
  };

  fetchSignup = () => {
    fetch(`http://localhost:8181/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: this.state.email,
        password: this.state.password
      })
    })
      .then(res => {
        // console.log(res);
        return res.json();
      })
      .then(res => {
        console.log(res);
        window.sessionStorage.setItem("token", res.token);
      })
      .catch(err => {
        console.error(err);
      });
  };

  fetchLogin = () => {
    fetch(`http://localhost:8181/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: this.state.email,
        password: this.state.password
      })
    })
      .then(res => {
        // console.log(res);
        return res.json();
      })
      .then(res => {
        console.log(res);
        window.sessionStorage.setItem("token", res.token);
      });
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
