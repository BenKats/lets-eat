import React from "react";

const Card = props => {
  const cardStyle = {
    display: "inline-block",
    margin: "5px",
    padding: "0px 5px",
    border: "2px solid black"
  };
  console.log("hiiiiiiiii");
  console.log(props.recipes);

  return (
    <div>
      {props.viewMyRecipes === false ? (
        <div style={cardStyle} key={props.index}>
          <h2>{props.recipe.title}</h2>
          <img src={props.recipe.image} alt="Recipe Picture" />
          <p>
            Ingredients Used <span>{props.recipe.usedIngredientCount}</span>
          </p>
          <ul>
            {props.recipe.usedIngredients.map((ingredient, index) => {
              return <li key={index}>{ingredient.name}</li>;
            })}
          </ul>
          <p>
            Ingredients to Buy <span>{props.recipe.missedIngredientCount}</span>
          </p>
          {props.recipe.missedIngredients.map((ingredient, index) => {
            return <li key={index}>{ingredient.name}</li>;
          })}
          <button>Info</button>
          <button onClick={() => props.saveHandler(props.recipe.id)}>
            Save
          </button>
        </div>
      ) : (
        <div style={cardStyle} key={props.index}>
          <h2>{props.recipe.title}</h2>
          <img src={props.recipe.image} alt="Recipe Picture" />
          <p>
            Ingredients Used <span>{props.recipe.usedIngredientCount}</span>
          </p>
          <ul>
            {props.recipe.ingredients.map((ingredient, index) => {
              return <li key={index}>{ingredient.name}</li>;
            })}
          </ul>
          <p>
            Instructions:<br></br>
            {props.recipe.instructions}
          </p>
          <button onClick={() => props.deleteHandler()}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Card;
