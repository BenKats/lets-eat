import React, { Component } from "react";
import "./App.css";

import AutocompleteContainer from "./components/Autocomplete/AutocompleteContainer";
import Card from "./components/RecipeCards/Card";
import tempRecipes from "./assets/tempGetRecipes.json";
class App extends Component {
  state = {
    selectedIngredients: [],
    recipes: [],
    //consider making saved recipes a n array of objects {name: pie, id: 777}
    savedRecipes: []
  };

  submitHandler = ingredients => {
    console.log("submitHandler Called", ingredients);
    this.setState({ selectedIngredients: ingredients });
  };

  //This function needs to make a call to the database to save the id to the user
  saveHandler = recipeId => {
    console.log("saveHandler Called", recipeId);
    const newRecipe = [...this.state.savedRecipes];
    newRecipe.push(recipeId);
    //Change this to get saved recipes from database
    if (!this.state.savedRecipes.includes(recipeId)) {
      this.fetchAddRecipe(recipeId);
    }
    this.setState({ savedRecipes: newRecipe });
  };

  fetchRecipes = () => {
    let str = "";
    this.state.selectedIngredients.forEach(element => {
      str += `,${element.name}`;
    });
    str = str.substring(1);
    console.log(str);

    fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${str}&number=10&limitLicense=false&ranking=2&ignorePantry=false&apiKey=43d29fdc7015415fa6033d894c28c98c`,
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

  fetchAddRecipe = recipeId => {
    const id = recipeId;
    fetch(
      //hard coded link, make it modular
      `http://localhost:8181/add/${id}`,
      {
        method: "PUT"
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
        {/* ONLY FOR TESTING SHOULD NOT HAVE AN ONCLICK HERE */}
        <p onClick={this.fetchRecipes}>Select Your Ingredients</p>
        <AutocompleteContainer submitHandler={this.submitHandler} />
        <Card recipes={this.state.recipes} saveHandler={this.saveHandler} />
      </div>
    );
  }
}

export default App;
