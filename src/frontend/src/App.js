import React, { Component } from "react";
import "./App.css";

import AutocompleteContainer from "./components/Autocomplete/AutocompleteContainer";
import Card from "./components/RecipeCards/Card";
import EntryContainer from "./components/UserEntry/EntryContainer";

class App extends Component {
  state = {
    selectedIngredients: [],
    recipes: [],
    //consider making saved recipes a n array of objects {name: pie, id: 777}
    savedRecipes: [],
    token: "",
    myRecipes: [],
    viewMyRecipes: false
  };

  submitHandler = ingredients => {
    console.log("submitHandler Called", ingredients);
    this.setState({
      viewMyRecipes: false,
      selectedIngredients: ingredients,
      myRecipes: []
    });
  };

  //This function needs to make a call to the database to save the id to the user
  saveHandler = recipeId => {
    console.log("saveHandler Called", recipeId);
    const newRecipe = [...this.state.savedRecipes];
    newRecipe.push(recipeId);
    //Change this to get saved recipes from database
    if (!this.state.savedRecipes.includes(recipeId)) {
      this.fetchAddRecipe(recipeId);
      this.setState({ savedRecipes: newRecipe });
    } else {
      alert("This recipe is already saved");
    }
  };

  deleteHandler = index => {
    console.log("delete handler index", index);
    console.log("Delete Handler Called", index);
    const myNewRecipes = [...this.state.myRecipes];
    console.log(`ingredients presplice is ${myNewRecipes}`);
    myNewRecipes.splice(index, 1);
    console.log(`ingredients postsplice is ${myNewRecipes}`);
    this.setState({
      myRecipes: myNewRecipes
    });
    // this.fetchDeleteRecipe();
  };

  tokenHandler = (newToken, userRecipes) => {
    //...new Set removes duplicate values if they exist
    this.setState({ token: newToken, savedRecipes: [...new Set(userRecipes)] });
  };

  myRecipeViewHandler = () => {
    // console.log("myRecipeViewHandler called");
    // if (this.state.viewMyRecipes === false && this.state.token != null) {
    //   console.log("my recipe view handler first if");
    //   if (
    //     this.state.savedRecipes === null ||
    //     this.state.savedRecipes.length === 0
    //   ) {
    //     console.log("my recipe view handler second if");
    //     alert("You have no recipes :(");
    //   } else {
    //     console.log("IN ELSE");
    //     this.setState({
    //       recipes: this.state.savedRecipes,
    //       viewMyRecipes: true
    //     });
    //   }
    // }
    if (!this.state.viewMyRecipes && this.state.token != null) {
      this.setState({ recipes: [], viewMyRecipes: true });
      this.fetchUserRecipes();
      this.state.savedRecipes.forEach(id => {
        console.log("saved recipe id", id);
        this.fetchRecipeInformation(id);
      });
    }
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
    )
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
    fetch(`http://localhost:8181/add/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.state.token
      }
    }) //Force break
      .then(res => {
        console.log(res);
        return res.json();
      })
      .catch(error => {
        console.error(error);
      });
  };

  fetchDeleteRecipe = recipeId => {
    const id = recipeId;
    fetch(`http://localhost:8181/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.state.token
      }
    })
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(res => {
        this.fetchUserRecipes();
      })
      .catch(error => {
        console.error(error);
      });
  };

  fetchUserRecipes = () => {
    fetch(`http://localhost:8181/recipes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.state.token
      }
    })
      .then(res => {
        // console.log(res);
        return res.json();
      })
      .then(res => {
        console.log("Fetched User Recipes", res);
        this.setState({ savedRecipes: res });
      })
      .catch(error => {
        console.error(error);
      });
  };

  fetchRecipeInformation = recipeId => {
    fetch(
      `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=43d29fdc7015415fa6033d894c28c98c`,
      {
        method: "GET"
      }
    )
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log("Fetched Recipe Info", res);
        this.setState({ temp: res });
        return this.state.temp;
      })
      .then(temp => {
        const newMyRecipe = [...this.state.myRecipes];
        let builder = {
          title: temp.title,
          id: temp.id,
          image: temp.image,
          instructions: temp.instructions,
          ingredients: temp.extendedIngredients
        };
        console.log("builder", builder);
        newMyRecipe.push(builder);
        this.setState({ myRecipes: newMyRecipe });
      });
  };

  render() {
    return (
      <div className="App">
        <EntryContainer tokenHandler={this.tokenHandler} />
        <h1>Hello, Let's Eat!</h1>
        {/* ONLY FOR TESTING SHOULD NOT HAVE AN ONCLICK HERE */}
        <p onClick={this.fetchRecipes}>Select Your Ingredients</p>

        <AutocompleteContainer submitHandler={this.submitHandler} />
        <button onClick={this.myRecipeViewHandler}>My Recipes</button>
        {this.state.viewMyRecipes === false
          ? this.state.recipes.map((recipe, index) => {
              return (
                <Card
                  recipe={recipe}
                  index={index}
                  viewMyRecipes={this.state.viewMyRecipes}
                  saveHandler={this.saveHandler}
                />
              );
            })
          : this.state.myRecipes.map((recipe, index) => {
              return (
                <Card
                  index={index}
                  recipe={recipe}
                  viewMyRecipes={this.state.viewMyRecipes}
                  deleteHandler={() => this.deleteHandler(index)}
                />
              );
            })}
        {/* <Card
          recipes={this.state.recipes}
          myRecipes={this.state.myRecipes}
          viewMyRecipes={this.state.viewMyRecipes}
          saveHandler={this.saveHandler}
          deleteHandler={() => this.deleteHandler()}
        /> */}
      </div>
    );
  }
}

export default App;
