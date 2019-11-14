import React, { Component } from "react";
import "./App.css";

import AutocompleteContainer from "./components/AutocompleteContainer";
class App extends Component {
  state = {
    selectedIngredients: []
  };

  submitHandler = ingredients => {
    console.log("submitHandler Called", ingredients);
    this.setState({ selectedIngredients: ingredients });
  };

  render() {
    return (
      <div className="App">
        <h1>Hello, Let's Eat!</h1>
        <p>Select Your Ingredients</p>

        <AutocompleteContainer submitHandler={this.submitHandler} />
      </div>
    );
  }
}

export default App;
