import React from "react";

const Card = props => {
  const cardStyle = {
    display: "inline-block",
    margin: "0px 5px",
    padding: "0px 5px",
    border: "2px solid black"
  };
  return (
    <p style={cardStyle} onClick={props.deleteCardHandler}>
      {props.name}
    </p>
  );
};

export default Card;
