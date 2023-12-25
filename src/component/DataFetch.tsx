import React, { useEffect, useState } from "react";
import { expense } from "../model/expense";
import { Table, IconButton } from "rsuite";
import axios from "axios";
import { Trash, Edit } from "@rsuite/icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Pagination } from "rsuite";
import "react-confirm-alert/src/react-confirm-alert.css";

const { Column, HeaderCell, Cell } = Table;
const DataFetch = () => {
  const [activepage, setactivepage] = useState<number>(1);
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const deleteHandler = async (userId: string) => {
    try {
      console.log("Reached");
      setReload(false);
      await axios.delete(
        `http://localhost:5000/api/external/expenses/${userId}`,
        {
          headers: {
            token: localStorage.getItem("token"),
            pageNo: activepage,
            pageSize:6,
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
    const getPageData = async () => {
      await axios
        .get<{data: expense[], count: number}>("http://localhost:5000/api/external/expenses", {
          headers: {
            token: localStorage.getItem("token"),
            pageNo: (activepage),
            pageSize: 9
          },
        })
        .then((res) => {
          setCount(res.data.count);
          console.log(res.data.count)
          setExpenses(res.data.data);
        });
      }
    if (reload) {
      getPageData();
    }
}, [reload,activepage]);
  return (
    <div style={{paddingLeft: 50, paddingRight: 50}}>
      {expenses && (
        <Table
        height={460}
          data={expenses}
          onRowClick={(rowData) => {
            console.log(rowData);
          }}
        >
          {/* <Column width={60} align="center" fixed>
        <HeaderCell>Id</HeaderCell>
        <Cell dataKey="id" />
      </Column> */}

          <Column width={300}>
            <HeaderCell className="font">Title</HeaderCell>
            <Cell  style={{paddingLeft:20}} dataKey="title" />
          </Column>
          <Column>
            <HeaderCell className="font">Type</HeaderCell>
            <Cell dataKey="type" />
          </Column>

          <Column width={200}>
            <HeaderCell className="font">Amount</HeaderCell>
            <Cell dataKey="amount" />
          </Column>

          <Column width={310}>
            <HeaderCell className="font">Date</HeaderCell>
            <Cell dataKey="date" />
          </Column>
          <Column>
            <HeaderCell className ="font">Category</HeaderCell>
            <Cell dataKey="category" />
          </Column>

          <Column fixed="right" width={310}>
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
          <div style={{display: 'flex', justifyContent:'flex-end' }}>

       <Pagination
          prev
          last
          next
          first
          total={count}
          size="md"
          pages={Math.ceil(count/9)}
          activePage={activepage}
          onChangePage={(page)=>setactivepage(page)}
        />
 </div>
    </div>
  );
};

export default DataFetch;
