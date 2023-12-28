import React from "react";
import { Form, Button } from "rsuite";
import { SelectPicker, InputPicker } from "rsuite";
import { IExpenseValidationError } from "../pages/AddExpense";
interface Props {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validationErrors: IExpenseValidationError;
  isEdit: boolean;
  handleSubmit: (response: {
    type: string;
    title: string;
    amount: number;
    date: Date;
    category: string;
  }) => Promise<void>;
  setResponse: React.Dispatch<
    React.SetStateAction<{
      type: string;
      title: string;
      amount: number;
      date: Date;
      category: string;
    }>
  >;
  response: {
    type: string;
    title: string;
    amount: number;
    date: Date;
    category: string;
  };
}
const AddExpenseForm = ({
  handleSubmit,
  response,
  setResponse,
  isEdit,
  validationErrors,
  handleChange,
}: Props) => {
  var list = [
    "Health ",
    "Entertainment",
    "Food",
    "Travel",
    "Education",
    "Other",
  ].map((item) => ({ label: item, value: item }));
  var list1 = ["Debit", "Credit"].map((item) => ({ label: item, value: item }));

  return (
    <div>
      <Form layout="inline">
        <InputPicker
          data={list1}
          style={{ width: 112 }}
          onChange={(value) => {
            if (value) {
              setResponse({ ...response, type: value });
            }
          }}
          value={response.type}
          appearance="default"
          placeholder="Select Type"
          defaultValue="Entertainment"
        ></InputPicker>
        <Form.ErrorMessage show={validationErrors.type.hasError}>
          {validationErrors.type.errorMessage}
        </Form.ErrorMessage>

        <Form.Group controlId="title" onChange={handleChange}>
          <Form.ControlLabel>Title</Form.ControlLabel>
          <Form.Control
            name="title"
            type="text"
            style={{ width: 160 }}
            value={response.title}
          />
          <Form.ErrorMessage show={validationErrors.title.hasError}>
            {validationErrors.title.errorMessage}
          </Form.ErrorMessage>
          <Form.HelpText tooltip>Required</Form.HelpText>
        </Form.Group>

        <Form.Group controlId="amount" onChange={handleChange}>
          <Form.ControlLabel>Amount</Form.ControlLabel>
          <Form.Control
            name="amount"
            type="number"
            value={response.amount}
            autoComplete="off"
            style={{ width: 160 }}
          />
          <Form.ErrorMessage show={validationErrors.amount.hasError}>
            {validationErrors.amount.errorMessage}
          </Form.ErrorMessage>
        </Form.Group>

        {/* <Button>Login</Button> */}
      </Form>
      <Form layout="inline">
        <Form.Group controlId="date" onChange={handleChange}>
          <Form.ControlLabel>Date</Form.ControlLabel>
          <Form.Control
            name="date"
            type="date"
            value={new Date(response.date).toISOString().split("T")[0]}
          />
          <Form.ErrorMessage show={validationErrors.date.hasError}>
            {validationErrors.date.errorMessage}
          </Form.ErrorMessage>
        </Form.Group>
        <SelectPicker
          data={list}
          onChange={(value) => {
            if (value) {
              setResponse({ ...response, category: value });
            }
          }}
          value={response.category}
          appearance="default"
          placeholder="Select Category"
          style={{ width: 224 }}
          defaultValue="Entertainment"
        ></SelectPicker>
        <Form.ErrorMessage show={validationErrors.category.hasError}>
          {validationErrors.category.errorMessage}
        </Form.ErrorMessage>
      </Form>
      <Button appearance="primary" onClick={() => handleSubmit(response)}>
        {!isEdit ? "Add" : "Edit"}
      </Button>
    </div>
  );
};

export default AddExpenseForm;
