import React, { useEffect, useState } from "react";
import { expense } from "../model/expense";
import { Table, IconButton } from "rsuite";
import axios from "axios";
import { Trash, Edit } from "@rsuite/icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const { Column, HeaderCell, Cell } = Table;
const DataFetch = () => {
  let expenseId: string;
  const navigate = useNavigate();
  const deleteHandler = async (userId: string) => {
    try {
      console.log("Reached");
      setReload(false);
      await axios.delete(
        `http://localhost:5000/api/external/expenses/${userId}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setReload(true);
      toast.success("Expense Deleted Successfully");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const [expenses, setExpenses] = useState<expense[]>([]);
  const [reload, setReload] = useState(true);

  useEffect(() => {
    const DataFetch = async () => {
      await axios
        .get("http://localhost:5000/api/external/expenses", {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setExpenses(res.data);
        });
    };
    if (reload) {
      DataFetch();
    }
  }, [reload]);

  return (
    <div>
      {expenses && (
        <Table
          height={400}
          width={1200}
          data={expenses}
          onRowClick={(rowData) => {
            console.log(rowData);
          }}
        >
          {/* <Column width={60} align="center" fixed>
        <HeaderCell>Id</HeaderCell>
        <Cell dataKey="id" />
      </Column> */}

          <Column width={200}>
            <HeaderCell className="font">Title</HeaderCell>
            <Cell dataKey="title" />
          </Column>
          <Column width={200}>
            <HeaderCell className="font">Type</HeaderCell>
            <Cell dataKey="type" />
          </Column>

          <Column width={200}>
            <HeaderCell className="font">Amount</HeaderCell>
            <Cell dataKey="amount" />
          </Column>

          <Column width={200}>
            <HeaderCell className="font">Date</HeaderCell>
            <Cell dataKey="date" />
          </Column>

          <Column width={200}>
            <HeaderCell className ="font">Category</HeaderCell>
            <Cell dataKey="category" />
          </Column>

          <Column width={250} fixed="right">
            <HeaderCell className="font">Action </HeaderCell>

            <Cell style={{ padding: "6px" }}>
              {(rowData) => (
                <div>
                <IconButton
                  appearance="subtle"
                  color="yellow"
                  icon={<Edit fill="black" />}
                  onClick={() => navigate(`/editExpense/${rowData._id}`)}
                ></IconButton>

                <IconButton
                appearance="subtle"
                color="red"
                icon={<Trash></Trash>}
                onClick={() => {
                  deleteHandler(rowData._id);
                }}
              ></IconButton>
              </div>
              )}
            </Cell>
          </Column>
          
        </Table>
      )}
    </div>
  );
};

export default DataFetch;
