import React from "react";

const AutocompleteInput = props => {
  return (
    <div>
      <input type="text" onChange={props.changeHandler} />
      <button onClick={props.addCardHandler}>Add</button>
      <button>Submit</button>
    </div>
  );
};

export default AutocompleteInput;
