import React, { useEffect, useState } from "react";
import { Form, Button } from "rsuite";
import { InputPicker } from "rsuite";
import { expense } from "../model/expense";
import { Table, IconButton } from "rsuite";
import { Trash, Edit } from "@rsuite/icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Pagination } from "rsuite";
import { getPageData, getPageDataWithFilter } from "../Services/expenseService";
import { deleteExpense } from "../Services/expenseService";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
interface Props {
  activepage: number;
  setactivepage: React.Dispatch<React.SetStateAction<number>>;
  expenses: expense[];
  setExpenses: React.Dispatch<React.SetStateAction<expense[]>>;
}
const { Column, HeaderCell, Cell } = Table;
const DataFetch = ({
  activepage,
  setactivepage,
  expenses,
  setExpenses,
}: Props) => {
  const options = {
    title: "Are you sure want to delete ",
    message: "",
    buttons: [
      {
        label: "Yes" ,
        onClick: () => deleteHandler(expenseId),
      },
      {
        label: "No" ,
      },
    ],
    closeOnEscape: true,
    closeOnClickOutside: true,
    keyCodeForClose: [8, 32],
    willUnmount: () => {},
    afterClose: () => {},
    onClickOutside: () => {},
    onKeypress: () => {},
    onKeypressEscape: () => {},
    overlayClassName: "overlay-custom-class-name",
  };
  let expenseId : string ;
  


  const handleFilter = async () => {
    if (buttonText === "Apply Filters") {
      if (
        !response.type &&
        !response.title &&
        !response.amount &&
        !response.category &&
        !response.startdate &&
        !response.endate
      ) {
        return;
      } else {
        setbuttonText("Remove Filters");
        setReload(false);
        setisfilter(true);
        //     const data:AxiosResponse = await getPageDataWithFilter(activepage,response);
        //     setExpenses(data.data.data);
        // }
      }
    } else {
      setbuttonText("Apply Filters");
      setisfilter(false);
      setReload(true);
      setResponse({
        type: "",
        title: "",
        amount: 0,
        startdate: d,
        endate: new Date(),
        category: "",
      });
    }
  };
  const [reloadAfterFilter, setreloadAfterFilter] = useState<boolean>(true);
  var d = new Date();
  var month = d.getMonth();
  d.setMonth(month - 1);
  const [response, setResponse] = useState({
    type: "",
    title: "",
    amount: 0,
    startdate: d,
    endate: new Date(),
    category: "",
  });
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const [isfilter, setisfilter] = useState<boolean>(false);
  const deleteHandler = async (userId: string) => {
    try {
      console.log("Reached");
      setReload(false);
      await deleteExpense(userId);
      if (isfilter) {
        setreloadAfterFilter(!reloadAfterFilter);
      } else setReload(true);
      toast.success("Expense Deleted Successfully");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setResponse({
      ...response,
      [e.target.name]: val,
    });
  };
  const  deleteConfirmation=()=>{
    confirmAlert(options);
  }
  var list1 = ["Credit", "Debit"].map((item) => ({ label: item, value: item }));

  const [reload, setReload] = useState(true);
  const [buttonText, setbuttonText] = useState<string>("Apply Filters");

  useEffect(() => {
    // const getPageData = async () => {
    //   await axios
    //     .get<{data: expense[], count: number}>("http://localhost:5000/api/external/expenses", {
    //       headers: {
    //         token: localStorage.getItem("token"),
    //         pageNo: (activepage),
    //         pageSize: 9
    //       },
    //     })
    //     .then((res) => {
    //       setCount(res.data.count);
    //       console.log(res.data.count)
    //       setExpenses(res.data.data);
    //     });
    //   }
    if (reload) {
      try {
        getPageData(activepage).then((data) => {
          setCount(data.data.count);
          console.log(data.data.data);
          setExpenses(data.data.data);
        });
      } catch (err) {
        toast.error("Some error related to" + err);
      }
    }
    if (isfilter) {
      try {
        getPageDataWithFilter(activepage, response).then((data) => {
          setCount(data.data.count);
          setExpenses(data.data.data);
        });
      } catch (err) {
        toast.error("Some issue");
      }
    }
  }, [reload, activepage, isfilter, reloadAfterFilter]);
  return (
    <div>
      <div>
        <Form
          layout="inline"
          style={{ marginTop: "10px ", marginLeft: "10px" }}
        >
          <InputPicker
            data={list1}
            style={{ width: 80 }}
            onChange={(value) => {
              if (value) {
                setResponse({ ...response, type: value });
              }
            }}
            value={response.type}
            appearance="default"
            placeholder=" Type"
            defaultValue="Entertainment"
          ></InputPicker>

          <Form.Group controlId="title" onChange={handleChange}>
            <Form.ControlLabel>Title</Form.ControlLabel>
            <Form.Control
              name="title"
              style={{ width: 90 }}
              value={response.title}
            />
          </Form.Group>
          <Form.Group controlId="amount" onChange={handleChange}>
            <Form.ControlLabel>Amount</Form.ControlLabel>
            <Form.Control
              name="amount"
              style={{ width: 80 }}
              value={response.amount}
            />
          </Form.Group>
          <Form.Group controlId="startdate" onChange={handleChange}>
            <Form.ControlLabel>Start Date</Form.ControlLabel>
            <Form.Control
              style={{ width: 120 }}
              name="startdate"
              type="date"
              value={new Date(response.startdate).toISOString().split("T")[0]}
            />
          </Form.Group>
          <Form.Group controlId="enddate" onChange={handleChange}>
            <Form.ControlLabel>End Date</Form.ControlLabel>
            <Form.Control
              style={{ width: 120 }}
              name="endate"
              type="date"
              value={new Date(response.endate).toISOString().split("T")[0]}
            />
          </Form.Group>
          <Form.Group controlId="category" onChange={handleChange}>
            <Form.ControlLabel>Category</Form.ControlLabel>
            <Form.Control
              name="category"
              style={{ width: 90 }}
              value={response.category}
            />
          </Form.Group>
          <Button appearance="primary" onClick={handleFilter}>
            {buttonText}
          </Button>
        </Form>
      </div>

      <div style={{ paddingLeft: 20, paddingRight: 50 }}>
        {expenses && (
          <Table
            style={{ marginTop: "2px" }}
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

            <Column width={210}>
              <HeaderCell className="font">Title</HeaderCell>
              <Cell style={{ paddingLeft: 20 }} dataKey="title" />
            </Column>
            <Column>
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
            <Column width={180}>
              <HeaderCell className="font">Category</HeaderCell>
              <Cell dataKey="category" />
            </Column>

            <Column fixed="right" width={300}>
              <HeaderCell className="font">Action </HeaderCell>

              <Cell style={{ padding: "6px" }}>
                {(rowData) => (
                  <div>
                    <IconButton
                      appearance="subtle"
                      color="yellow"
                      icon={<Edit fill="black" />}
                      onClick={() =>
                        navigate(`/editExpense/${rowData._id}`)
                        // , {
                        //   state: {
                        //     isfilter: isfilter,
                        //     setisfilter: setisfilter,
                        //     reload: reload,
                        //     setReload: setReload,
                        //     reloadAfterFilter: reloadAfterFilter,
                        //     setreloadAfterFilter: setreloadAfterFilter,
                        //   },
                        // })
                      }
                    ></IconButton>

                    <IconButton
                      appearance="subtle"
                      color="red"
                      icon={<Trash></Trash>}
                      onClick={() => {
                        expenseId = rowData._id;
                        deleteConfirmation();
                      }}
                    ></IconButton>
                  </div>
                )}
              </Cell>
            </Column>
          </Table>
        )}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Pagination
            prev
            last
            next
            first
            total={count}
            size="md"
            pages={Math.ceil(count / 9)}
            activePage={activepage}
            onChangePage={(page) => setactivepage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default DataFetch;
