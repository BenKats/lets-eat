import React from "react";

const ingredient = props => {
  return (
    <div>
      <p>Ingredient named {props.name}</p>
      {/* <input type="text" onChange={props.changed}></input> */}
    </div>
  );
};

export default ingredient;
