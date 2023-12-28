import React, { useEffect, useState } from "react";
import { Nav, Navbar, Uploader, Button, IconButton } from "rsuite";
import HomeIcon from "@rsuite/icons/legacy/Home";
import ExitIcon from "@rsuite/icons/Exit";
import { Link, useLocation} from "react-router-dom";
import { FileType } from "rsuite/esm/Uploader";
import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { CgProfile } from "react-icons/cg";
import { MdAccountBalance } from "react-icons/md";
import CloseIcon from "@rsuite/icons/Close";
import Iconbutton from "../Atom/Iconbutton";
import { Profile } from "../Atom/Icons";
import Sample_Csv from  "../uploads/convertcsv.csv"
import { Alert } from "react-bootstrap";

const Header = () => {
  const route = useLocation();
  const path = route.pathname;
  const [buttonText, setButtonText] = useState<string>("Balance");
  const handleBalance = async () => {
    try {
      const userId = localStorage.getItem("token");
      const data: AxiosResponse<string> = await axios.get(
        `http://localhost:5000/api/external/user/get_balance/${userId}`
      );
      console.log(data.data);
      let balance = data.data.toString();
      balance = "Rs " + balance + ". 00";
      setButtonText(balance.toString());

      toast.success("Balance fetched Successfully");
    } catch (err) {
      toast.error("Sorrry some error please try after some time");
    }
  };

  const [file, setfile] = useState<FileType[]>();
  const [isOpen, setIsopen] = useState(false);

  const toggleSidebar = () => {
    setButtonText("Balance");
    setIsopen(!isOpen);
  };
  useEffect(() => {
    const handleMedia = async (file: FileType[]) => {
      const formData = new FormData();
      console.log(file);
      try {
        if (file[0].blobFile) formData.append("csv_file", file[0].blobFile);

        await axios.post(
          "http://localhost:5000/api/external/expenses/import_csv",
          formData,
          {
            headers: {
              token: localStorage.getItem("token"),
              "Content-Type": "multipart/form-data",
            },
          }
        );
        window.location.reload();
        toast.success("Successfully updated");
      } catch (err) {
        toast.error("Some issues");
        return;
      }
    };
    if (file) handleMedia(file);
  }, [file]);

  return (
    <div id="header">
      <Navbar appearance="inverse">
        <Navbar.Brand style={{fontWeight: 700, fontSize: 18}}>Expense Tracker</Navbar.Brand>
        <Nav style={{display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
          <Nav.Item icon={<HomeIcon />}>
            <Link className={`navItem ${path === "/" && "activeTab"}`} to={"/"}>
              Home
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link
              className={`navItem ${path === "/addExpense" && "activeTab"}`}
              to={"/addExpense"}
            >
              Add Expense
            </Link>
          </Nav.Item>
          <Uploader
            accept=".csv"
            action=""
            onChange={(file) => {
              setfile(file);
            }}
            shouldUpload={() => false}
          >
            <Nav.Item>Upload Csv</Nav.Item>
          </Uploader>
          <Link to={Sample_Csv} target="_blank" download="Example csv file"  style={{marginTop:"8px"}}><Button  color="red">Download Sample Csv </Button>
          </Link>
        </Nav>
        <Nav pullRight>
          <Nav.Item>
            <Iconbutton
              appearance="subtle"
              handleClick={toggleSidebar}
              color="blue"
              size="lg"
              icon={<Profile  />}
            />
          </Nav.Item>
          <div
            onMouseLeave={toggleSidebar}
            className={`sidebar ${isOpen ? "active" : ""}`}

            style={{display: 'flex' ,flexDirection:'column'}}
          >
            <div className="sd-header">
              <h4 style={{ color: "white", fontFamily: 'sans-serif' }}>
                Your Profile
              </h4>
            </div>
            <div style={{display: 'flex', flexDirection:'column', justifyItems:'space-between'}}>
              <Nav.Item>
                <Iconbutton icon={<ExitIcon />}>
                  <Link
                    className="navItem"
                    to={"/logout"}
                    style={{ color: "black" }}
                  >
                    {" "}
                    Logout
                  </Link>
                </Iconbutton>
              </Nav.Item>

              <Nav.Item style={{}}>
                <IconButton
                  style={{ marginLeft: "1px" }}
                  icon={<MdAccountBalance style={{ margin: "10px" }} />}
                  onClick={handleBalance}
                >
                  {" "}
                  {buttonText}
                </IconButton>
              </Nav.Item>
            </div>
          </div>
        </Nav>
      </Navbar>
    </div>
  );
};

export default Header;
