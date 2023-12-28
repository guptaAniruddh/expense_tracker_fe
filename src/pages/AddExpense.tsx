import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import AddExpenseForm from "../organsm/AddExpenseForm";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { SchemaCheckResult } from "schema-typed";
import { Schema } from "rsuite";
import { addExpense, getExpenseById } from "../Services/expenseService";
import { editExpense } from "../Services/expenseService";
export type IExpenseValidationError = SchemaCheckResult<
  { type: string; title: string; amount: number; date: Date; category: string },
  string
>;

export const expenseValidationErrors: IExpenseValidationError = {
  type: {
    hasError: false,
  },
  title: {
    hasError: false,
  },
  amount: {
    hasError: false,
  },
  date: {
    hasError: false,
  },
  category: {
    hasError: false,
  },
};
const AddExpense = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] =
    useState<IExpenseValidationError>(expenseValidationErrors);
  const [response, setResponse] = useState({
    type: "",
    title: "",
    amount: 10,
    date: new Date(),
    category: "",
  });

  const [expenseId, setExpenseId] = useState("");
  useEffect(() => {
    if (params.id) {
      setExpenseId(params.id);
    }
  }, [params.id]);
  useEffect(() => {
    const Datafetch = async (id: string) => {
      const data = await getExpenseById(id);
      setResponse(data.data);
    };
    if (expenseId) {
      Datafetch(expenseId);
    }
  }, [expenseId]);

  const expenseModel = Schema.Model<{
    type: string;
    title: string;
    amount: number;
    date: Date;
    category: string;
  }>({
    type: Schema.Types.StringType().isRequired("This field is mandatory"),
    title: Schema.Types.StringType().isRequired("This field is mandatory"),
    amount: Schema.Types.NumberType().isRequired("This field is madatory"),
    date: Schema.Types.DateType().isRequired("Date is required to Track"),
    category: Schema.Types.StringType().isRequired(
      "Category is required to categorise your expenses"
    ),
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const field = e.target.name as
      | "title"
      | "amount"
      | "date"
      | "category"
      | "type";
    setResponse({
      ...response,
      [e.target.name]: val,
    });
    const partialCheck = expenseModel.checkForField(field, response);
    setValidationErrors({
      ...validationErrors,
      [field]: partialCheck,
    });
  };
  const handleSubmit = async (response: {
    type: string;
    title: string;
    amount: number;
    date: Date;
    category: string;
  }) => {
    try {
      const checkResult = expenseModel.check(response);
      setValidationErrors(checkResult);
      if (
        checkResult.type?.hasError ||
        checkResult.title?.hasError ||
        checkResult.amount?.hasError ||
        checkResult.category?.hasError ||
        checkResult.date?.hasError
      ) {
        toast.error("Error in Form FIelds");
        return;
      }

      const data = await addExpense(response);
      if (data.data) {
        toast.success("Expense Added Successfully");
        navigate("/");
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const handleEdit = async (response: {
    type: string;
    title: string;
    amount: Number;
    date: Date;
    category: string;
  }) => {
    try {
      editExpense(expenseId, response);
      toast.success("Expense Edited Successfully");
      navigate("/");
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal.Dialog>
        <Modal.Header
          closeButton
          onHide={() => {
            navigate("/");
          }}
        >
          <Modal.Title className="hstyle">
            {!expenseId ? "Add New Expense" : "Edit Expense"}{" "}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <AddExpenseForm
            handleChange={handleChange}
            validationErrors={validationErrors}
            isEdit={!!expenseId}
            handleSubmit={expenseId ? handleEdit : handleSubmit}
            response={response}
            setResponse={setResponse}
          />
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
};

export default AddExpense;
