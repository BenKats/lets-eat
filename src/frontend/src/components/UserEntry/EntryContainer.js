import React, { Component } from "react";

import Entry from "./Entry";
class EntryContainer extends Component {
  state = {
    email: "",
    password: "",
    savedRecipes: [],
    token: ""
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
  };

  loginHandler = () => {
    console.log("loginHandler Called");
    this.fetchLogin();
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
        this.setState({ token: res.token }, () => {
          this.props.tokenHandler(this.state.token);
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  //Login: Gets token, gets saved user recipes by token, returns token and saved recipes to App.js
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
        this.setState({ token: res.token });
        return res.token;
      })
      .then(token => {
        if (token !== null) {
          this.fetchUserRecipes(token);
        } else {
          alert("User Not Found");
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  fetchUserRecipes = token => {
    fetch(`http://localhost:8181/recipes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    })
      .then(res => {
        // console.log(res);
        return res.json();
      })
      .then(res => {
        console.log("Fetched User Recipes", res);
        this.setState({ savedRecipes: res });
        return res;
      })
      .then(callback => {
        this.props.tokenHandler(this.state.token, this.state.savedRecipes);
      });
  };
  renderIfNoToken() {
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
  render() {
    return (
      <div>
        {!this.state.token ? (
          this.renderIfNoToken()
        ) : (
          <button
            onClick={() => {
              this.props.tokenHandler("");
              this.setState({ token: "" });
            }}>
            Log Out
          </button>
        )}
      </div>
    );
  }
}

export default EntryContainer;
