import React, { Component } from "react";
import allIngredients from "../assets/ingredients.json";
import AutocompleteInput from "./AutocompleteInput";
import Card from "./Card";

class AutocompleteContainer extends Component {
  state = {
    ingredients: allIngredients,
    text: "None",
    selectedIngredients: []
  };

  addCardHandler = e => {
    console.log("Called addCardHandler", e);
    // console.log(this.state.text);
    const newIngredient = [...this.state.selectedIngredients];
    newIngredient.push(this.state.text);
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
      </div>
    );
  }
}

export default AutocompleteContainer;
