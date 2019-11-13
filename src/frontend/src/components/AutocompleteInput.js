import React from "react";

const AutocompleteInput = props => {
  return (
    <div>
      <input type="text" onChange={props.changeHandler} />
      {/* if I want to keep the add button I would need to have another function
      which goes through the JSON checks for an exact match and sends back the
      ingredient, cause I need the id of the ingredient not just the name */}
      <button onClick={() => props.addCardHandler(props.text)}>Add</button>
      <button>Submit</button>
    </div>
  );
};

export default AutocompleteInput;
