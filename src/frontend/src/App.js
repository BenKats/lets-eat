import React, { Component } from "react";
import "./App.css";

import AutocompleteContainer from "./components/AutocompleteContainer";
class App extends Component {
  state = {
    ingredients: [
      {
        name: "first"
      },
      {
        name: "second"
      }
    ],
    value: ""
  };

  render() {
    return (
      <div className="App">
        <h1>Hello, Let's Eat!</h1>
        <p>Select Your Ingredients</p>

        <AutocompleteContainer />
      </div>
    );
  }
}

export default App;
