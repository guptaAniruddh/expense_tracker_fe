import React, { useState } from "react";
import InputField from "../organsm/InputField";
import Modal from "react-bootstrap/Modal";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { User } from "../model/user";
import { toast } from "react-toastify";
import { login } from "../Services/userService";

const Login = () => {
  const navigate = useNavigate();
  const [response, setResponse] = useState({
    username: "",
    password: "",
  });
  const handleSubmit = async (response: {
    username: string;
    password: string;
  }) => {
    try {
      const data: AxiosResponse<User> = await login(response);
      localStorage.setItem("token", data.data._id);
      toast.success("Log in successful");
      navigate("/", { replace: true });
      window.location.reload();
    } catch (error) {
      toast.error("Invalid Credentials");
    }
  };
  return (
    <>
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal.Dialog>
          <Modal.Body>
            <InputField
              handleSubmit={handleSubmit}
              response={response}
              setResponse={setResponse}
            />
          </Modal.Body>
        </Modal.Dialog>
      </div>
    </>
  );
};
export default Login;
