import React, { Component } from 'react';
import allIngredients from '../../assets/ingredients.json';
import AutocompleteInput from './AutocompleteInput';
import Card from './Card';
import SuggestionItem from './SuggestionItem';

class AutocompleteContainer extends Component {
    state = {
        ingredients: allIngredients,
        text: 'None',
        selectedIngredients: []
    };

    //This function is called if we are validating an ingredient which was not a Suggestion. If the ingredient exists in our list we return the object otherwise we return -1 as a flag.
    validateIngredient = ingredientName => {
        console.log('Called Validate Ingredient');
        let match = -1;
        this.state.ingredients.forEach(ingredient => {
            if (ingredient.name === ingredientName) {
                console.log('ITS A MATCH', ingredient);
                return (match = ingredient);
            }
        });
        console.log(match);
        return match;
    };

    addCardHandler = ingredient => {
        //This handler either receives an ingredient object from SuggestionItem or user inputted text from AutocompleteInput. We have to validate the user inputted text so we check if it has an id property, if not then we call validateIngredient to see if the ingredient exists in our JSON.
        console.log('Called addCardHandler', ingredient);
        // console.log(this.state.text);
        const newIngredient = [...this.state.selectedIngredients];

        //User Input via add button, not selected from Suggestion
        if (ingredient.id === undefined) {
            const validated = this.validateIngredient(ingredient);
            if (validated === -1) {
                alert(
                    'Ingredient Not Found:\nThats a unique ingredient you got there\n Please check that spelling was correct.'
                );
            } else {
                newIngredient.push(validated);
            }
            //Ingredient was selected from Suggestion
        } else {
            newIngredient.push(ingredient);
        }

        this.setState({ selectedIngredients: newIngredient });
    };

    deleteCardHandler = index => {
        console.log(`deleteCardHandler called on index ${index}`);
        const ingredients = [...this.state.selectedIngredients];
        // console.log(`ingredients presplice is ${ingredients}`);
        ingredients.splice(index, 1);
        console.log(`ingredients postsplice is ${ingredients}`);
        this.setState({
            selectedIngredients: ingredients
        });
    };

    changeHandler = event => {
        console.log(event.target.value);
        this.setState({ text: event.target.value.toLowerCase() });
    };

    submitHandlerHelper = e => {
        //if I want to refactor without an anon function, to potentially make the code look cleaner I can comment this function out and replace the onclick submitHandlerHelper with  onClick={() => this.props.submitHandler(this.state.selectedIngredients)
        e.preventDefault();
        console.log(this.state.selectedIngredients);
        //clears text state to remove suggestions
        this.setState({ text: '' });
        this.props.submitHandler(this.state.selectedIngredients);
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
                    text={this.state.text}
                    addCardHandler={this.addCardHandler}
                    changeHandler={this.changeHandler}
                />
                <button onClick={this.submitHandlerHelper}>Submit</button>
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
