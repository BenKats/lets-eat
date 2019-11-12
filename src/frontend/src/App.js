import React, { Component } from "react";
import "./App.css";

import Ingredient from "./Ingredient.js";
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

  newIngredientInputHandler = event => {
    this.setState({
      value: event.target.value
    });
  };

  addIngredientHandler = event => {
    event.preventDefault();
    // console.log(this.state.value);
    const ingred = [...this.state.ingredients];
    ingred.push({ name: this.state.value });
    this.setState({ ingredients: ingred });
  };

  handleInputChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <div className="App">
        <h1>Hello, Let's Eat!</h1>
        <p>Select Your Ingredients</p>
        {/* <Ingredient
          name={this.state.ingredient.name}
          changed={this.newIngredientInputHandler}
        /> */}
        {this.state.ingredients.map((ingredient, index) => {
          return <Ingredient name={ingredient.name} key={index} />;
        })}
        <form onSubmit={event => this.addIngredientHandler(event)}>
          <label>
            Ingredient:
            <input
              type="text"
              onChange={event => this.handleInputChange(event)}
            />
          </label>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default App;
