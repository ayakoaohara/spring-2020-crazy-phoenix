import React from 'react';
import {withRouter} from 'react-router';
import SignUp from "./SignUp";

// redirect to /Login upon successful signup
const SignUpContainer = (props) => {
  let isFilled = props.isFilled;
  const change = () => {
    isFilled = true;
    props.history.push('/Login');
  };
  return <SignUp isFilled={true} action={change}/>;
};

export default withRouter(SignUpContainer);