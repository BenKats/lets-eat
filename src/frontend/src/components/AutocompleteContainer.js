import React, { Component } from "react";
import allIngredients from "../assets/ingredients.json";
import AutocompleteInput from "./AutocompleteInput";
import Card from "./Card";
import SuggestionItem from "./SuggestionItem";

class AutocompleteContainer extends Component {
  state = {
    ingredients: allIngredients,
    text: "None",
    selectedIngredients: []
  };

  addCardHandler = ingredient => {
    console.log("Called addCardHandler", ingredient);
    // console.log(this.state.text);
    const newIngredient = [...this.state.selectedIngredients];
    //This if else is temporary, should call a function that returns the exact JSON object
    if (ingredient.id == undefined) {
      newIngredient.push(ingredient);
    } else {
      newIngredient.push(ingredient.name);
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
    this.setState({ text: event.target.value });
  };

  render() {
    return (
      <div>
        {this.state.selectedIngredients.map((ingredient, index) => {
          return (
            <Card
              deleteCardHandler={() => this.deleteCardHandler(index)}
              name={ingredient}
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
