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

  addCardHandler = () => {
    console.log("hi");
    console.log(this.state.text);
    const newIngredient = [...this.state.selectedIngredients];
    newIngredient.push(this.state.text);
    this.setState({ selectedIngredients: newIngredient });
  };

  changeHandler = event => {
    this.setState({ text: event.target.value });
  };

  render() {
    return (
      <div>
        {this.state.selectedIngredients.map((ingredient, index) => {
          return <Card name={ingredient} key={index} />;
        })}
        <AutocompleteInput
          ingredients={this.state.ingredients}
          text={this.state.text}
          addCardHandler={() => this.addCardHandler}
          changeHandler={() => this.changeHandler}
        />
        <p>{this.state.text}</p>
      </div>
    );
  }
}

export default AutocompleteContainer;
