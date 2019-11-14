import React, { Component } from "react";
import allIngredients from "../assets/ingredients.json";
import AutocompleteInput from "./AutocompleteInput";
import Card from "./Card";
import SuggestionItem from "./SuggestionItem";
import ingredient from "../Ingredient.js";

class AutocompleteContainer extends Component {
  state = {
    ingredients: allIngredients,
    text: "None",
    selectedIngredients: []
  };

  validateIngredient = ingredientName => {
    // const checkName = ingredientName.toLowerCase();
    // const checkNameRes = this.state.ingredients.filter(ingredient => {
    //   return ingredient.name == checkName;
    // });
    // console.log(checkNameRes);
    this.state.ingredients.forEach(ingredient => {
      if (ingredient.name === ingredientName) {
        return ingredient;
      }
      return null;
    });
  };

  addCardHandler = ingredient => {
    console.log("Called addCardHandler", ingredient);
    // console.log(this.state.text);
    const newIngredient = [...this.state.selectedIngredients];

    if (ingredient.id === undefined) {
      const validated = this.validateIngredient(ingredient);
      if (validated === undefined) {
        alert(
          "Ingredient Not Found:\nThats a unique ingredient you got there\n Please check that spelling was correct."
        );
      }
    } else {
      newIngredient.push(ingredient);
    }

    this.setState({ selectedIngredients: newIngredient });
  };

  deleteCardHandler = index => {
    console.log(`deleteCardHandler called on index ${index}`);
    const ingredients = [...this.state.selectedIngredients];
    // console.log(`ingredients preslice is ${ingredients}`);
    ingredients.splice(index, 1);
    console.log(`ingredients postslice is ${ingredients}`);
    this.setState({
      selectedIngredients: ingredients
    });
  };

  changeHandler = event => {
    console.log(event.target.value);
    this.setState({ text: event.target.value.toLowerCase() });
  };

  render() {
    return (
      <div>
        {this.state.selectedIngredients.map((ingredient, index) => {
          return (
            <Card
              deleteCardHandler={() => this.deleteCardHandler(index)}
              name={ingredient.name}
              key={index}
            />
          );
        })}
        <AutocompleteInput
          ingredients={this.state.ingredients}
          text={this.state.text}
          addCardHandler={this.addCardHandler}
          changeHandler={this.changeHandler}
        />
        <p>{this.state.text}</p>
        <SuggestionItem
          text={this.state.text}
          ingredients={this.state.ingredients}
          addCardHandler={this.addCardHandler}
        />
      </div>
    );
  }
}

export default AutocompleteContainer;
