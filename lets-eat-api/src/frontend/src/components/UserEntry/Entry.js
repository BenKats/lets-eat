import React from "react";

const Entry = props => {
  return (
    <div>
      <input
        onChange={props.emailChangeHandler}
        type="text"
        placeholder="Email"
      />
      <input
        onChange={props.passwordChangeHandler}
        type="password"
        placeholder="Password"
      />
      <button onClick={props.loginHandler}>Log In</button>
      <button onClick={props.signupHandler}>Sign Up</button>
    </div>
  );
};
export default Entry;
