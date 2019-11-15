import React from "react";

const SuggestionItem = props => {
  return (
    <div>
      {props.ingredients.map((ingredient, index) => {
        return ingredient.name.includes(props.text) &&
          props.text.length >= 3 &&
          props.text !== " " ? (
          <div onClick={() => props.addCardHandler(ingredient)} key={index}>
            {ingredient.name}
          </div>
        ) : null;
      })}
    </div>
  );
};

export default SuggestionItem;
