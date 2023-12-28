import React, { useEffect, useState } from "react";
import { Modal, Schema } from "rsuite";
import InputFieldSignup from "../organsm/InputFieldSignup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SchemaCheckResult } from "../../node_modules/schema-typed/es/types";
import { toast } from "react-toastify";
import { signup } from "../Services/userService";
export type ISignUpValidationError = SchemaCheckResult<
  { username: string; password: string; email: string },
  string
>;
const intialValidationErrors: ISignUpValidationError = {
  username: {
    hasError: false,
  },
  email: {
    hasError: false,
  },
  password: {
    hasError: false,
  },
};

const SignUp = () => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const field = e.target.name as "username" | "email" | "password";
    setResponse({
      ...response,
      [e.target.name]: val,
    });
    const partialCheck = signUpModel.checkForField(field, response);
    setValidationErrors({
      ...validationErrors,
      [field]: partialCheck,
    });
  };
  const signUpModel = Schema.Model<{
    username: string;
    password: string;
    email: string;
  }>({
    username: Schema.Types.StringType()
      .isRequired("This field is required.")
      .minLength(3, "Username must be at least 3 characters long.")
      .maxLength(15, "Username cannot exceed 15 characters."),
    email: Schema.Types.StringType()
      .isEmail("Please enter a valid email address.")
      .isRequired("This field is required."),
    password: Schema.Types.StringType()
      .isRequired("This field is required.")
      .minLength(8, "Password must be at least 8 characters long.")
      .maxLength(15, "Password cannot exceed 15 characters."),
  });
  const [validationErrors, setValidationErrors] =
    useState<ISignUpValidationError>(intialValidationErrors);
  const navigate = useNavigate();
  const [isUserActive, setUserActive] = useState({
    username: false,
    email: false,
  });
  const [response, setResponse] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (response.username.length <= 0) {
      return;
    }
    const checkUsername = async () => {
      const { data: user } = await axios.get<{}, { data: object }>(
        `http://localhost:5000/api/external/user/username/${response.username}`
      );
      if (user) {
        setUserActive({ ...isUserActive, username: true });
      } else {
        setUserActive({ ...isUserActive, username: false });
      }
    };
    const timeoutId = setTimeout(checkUsername, 1000);
    return () => clearTimeout(timeoutId);
  }, [isUserActive, response]);
  useEffect(() => {
    if (response.email.length <= 0) {
      return;
    }
    const checkEmail = async () => {
      const { data: user } = await axios.get<{}, { data: object }>(
        `http://localhost:5000/api/external/user/${response.email}`
      );
      console.log(user);
      if (user) {
        setUserActive({ ...isUserActive, email: true });
      } else {
        setUserActive({ ...isUserActive, email: false });
      }
      console.log(isUserActive.email);
    };
    const timeoutId = setTimeout(checkEmail, 1000);
    return () => clearTimeout(timeoutId);
  }, [isUserActive, response]);

  const handleSubmit = async (response: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      const checkResult = signUpModel.check(response);
      setValidationErrors(checkResult);
      if (
        isUserActive.email ||
        isUserActive.username ||
        checkResult.email?.hasError ||
        checkResult.username?.hasError ||
        checkResult.password?.hasError
      ) {
        toast.error("Error in Form FIelds");
        return;
      }
      const data = await signup(response);
      if (data.data) {
        navigate("/login", { replace: true });
        toast.success("Sign Up successful");
      } else {
        throw Error("Some issue");
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Modal.Dialog>
        <Modal.Body>
          <InputFieldSignup
            handleChange={handleChange}
            validationErros={validationErrors}
            isUserActive={isUserActive}
            handleSubmit={handleSubmit}
            response={response}
            setResponse={setResponse}
          ></InputFieldSignup>
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
};

export default SignUp;
