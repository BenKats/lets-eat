import React from "react";

const AutocompleteInput = props => {
  return (
    <div>
      <input type="text" onChange={props.changeHandler} />
      <button onClick={() => props.addCardHandler(props.text)}>Add</button>
    </div>
  );
};

export default AutocompleteInput;
