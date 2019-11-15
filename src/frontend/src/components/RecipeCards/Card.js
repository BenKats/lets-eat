import React from "react";

const Card = props => {
  const cardStyle = {
    display: "inline-block",
    margin: "5px",
    padding: "0px 5px",
    border: "2px solid black"
  };
  return (
    <div>
      {props.recipes.map((recipe, index) => {
        return (
          <div style={cardStyle} key={index}>
            <h2>{recipe.title}</h2>
            <img src={recipe.image} alt="Recipe Picture" />;
            <p>
              Ingredients Used <span>{recipe.usedIngredientCount}</span>
            </p>
            <ul>
              {recipe.usedIngredients.map((ingredient, index) => {
                return <li key={index}>{ingredient.name}</li>;
              })}
            </ul>
            <p>
              Ingredients to Buy <span>{recipe.missedIngredientCount}</span>
            </p>
            {recipe.missedIngredients.map((ingredient, index) => {
              return <li key={index}>{ingredient.name}</li>;
            })}
            <button>Info</button>
            <button onClick={() => props.saveHandler(recipe.id)}>Save</button>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
