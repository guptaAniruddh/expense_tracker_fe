import React from "react";
import { Form, ButtonToolbar, Button } from "rsuite";
import { Link } from "react-router-dom";
import { ISignUpValidationError } from "../pages/SignUp";
interface Props {

  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (response: {
    username: string;
    email: string;
    password: string;
  }) => Promise<void>;
  validationErros: ISignUpValidationError;
  isUserActive: {
    username: boolean;
    email: boolean;
  };
  setResponse: React.Dispatch<
    React.SetStateAction<{
      username: string;
      email: string;
      password: string;
    }>
  >;
  response: {
    username: string;
    email: string;
    password: string;
  };
}

const InputFieldSignup = ({
  validationErros,
  handleSubmit,
  setResponse,
  response,
  isUserActive,
  handleChange,
}: Props) => {
  return (
    <div>
      <Form layout="vertical">
        <h3 style={{ marginBottom: 10 }}> Sign Up</h3>
        <Form.Group controlId="name-6" onChange={handleChange}>
          <Form.ControlLabel>Username</Form.ControlLabel>
          <Form.Control name="username" />
          <Form.ErrorMessage
            show={isUserActive.username || validationErros.username.hasError}
          >
            {validationErros.username.errorMessage || "Username already Exists"}
          </Form.ErrorMessage>
          <Form.HelpText>Required</Form.HelpText>
        </Form.Group>
        <Form.Group controlId="email-6" onChange={handleChange}>
          <Form.ControlLabel>Email</Form.ControlLabel>
          <Form.Control name="email" type="email" />
          <Form.ErrorMessage show={validationErros.email.hasError||isUserActive.email}>
            {validationErros.email.errorMessage || "Email Already Exists"}
          </Form.ErrorMessage>
          <Form.HelpText tooltip>Required</Form.HelpText>
        </Form.Group>
        <Form.Group controlId="password-6" onChange={handleChange}>
          <Form.ControlLabel>Password</Form.ControlLabel>
          <Form.Control name="password" type="password" autoComplete="off" />
          <Form.ErrorMessage show={validationErros.password.hasError}>
            {validationErros.password.errorMessage || ""}
          </Form.ErrorMessage>
        </Form.Group>
        <Link to={"/login"}>Already signed up? Login</Link>
        <Form.Group>
          <ButtonToolbar style={{ marginTop: 12, justifyContent: "center" }}>
            <Button appearance="primary" onClick={() => handleSubmit(response)}>
              Submit
            </Button>
          </ButtonToolbar>
        </Form.Group>
      </Form>
    </div>
  );
};

export default InputFieldSignup;
