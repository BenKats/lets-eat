import React, { Component } from "react";
import "./App.css";

import AutocompleteContainer from "./components/Autocomplete/AutocompleteContainer";
import Card from "./components/RecipeCards/Card";
import tempRecipes from "./assets/tempGetRecipes.json";
class App extends Component {
  state = {
    selectedIngredients: [],
    recipes: tempRecipes
  };

  submitHandler = ingredients => {
    console.log("submitHandler Called", ingredients);
    this.setState({ selectedIngredients: ingredients });
  };

  fetchRecipes = () => {
    fetch(
      //hard coded link, make it modular
      "https://api.spoonacular.com/recipes/findByIngredients?ingredients=sugar,rice,water,salt,flour,&number=10&limitLicense=false&ranking=2&ignorePantry=false&apiKey=43d29fdc7015415fa6033d894c28c98c",
      {
        method: "GET"
      }
    ) //Force break
      .then(res => {
        // console.log(res);
        return res.json();
      })
      .then(res => {
        return this.setState({ recipes: res });
      });
  };
  render() {
    return (
      <div className="App">
        <h1>Hello, Let's Eat!</h1>
        <p onClick={this.fetchRecipes}>Select Your Ingredients</p>

        <AutocompleteContainer submitHandler={this.submitHandler} />
        <Card recipes={this.state.recipes} />
      </div>
    );
  }
}

export default App;
