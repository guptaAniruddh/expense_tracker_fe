import React, { useEffect,useState } from 'react'
import {Nav,Navbar,Uploader,Button}from "rsuite"
import HomeIcon from '@rsuite/icons/legacy/Home';
import ExitIcon from '@rsuite/icons/Exit';
import { Link, useLocation,useNavigate } from 'react-router-dom';
import { FileType } from 'rsuite/esm/Uploader';
import axios from 'axios';
import { toast } from 'react-toastify';

const Header = () => {
 const route = useLocation();
  const path = route.pathname;
  const navigate = useNavigate();
   const [file, setfile] = useState<FileType[]>();
  
  useEffect(() => {

    const handleMedia = async(file:FileType[])=>{
      const formData = new FormData();
      console.log(file);
      try{
      if(file[0].blobFile)
      formData.append('csv_file',file[0].blobFile);
      
        
      
     await axios.post("http://localhost:5000/api/external/expenses/import_csv",formData,{
        headers:{
          token:localStorage.getItem('token'),
          "Content-Type": "multipart/form-data",
        }
      });
     window.location.reload();
      toast.success("Successfully updated");
    }
    catch(err){
      toast.error("Some issues");
      return ;
    }
      }
      if(file)
      handleMedia(file)
   
  }, [file])
  
  
  
  return (
    <Navbar appearance='inverse'>
    <Navbar.Brand>Expense Tracker</Navbar.Brand>
    <Nav>
      <Nav.Item icon={<HomeIcon/>} ><Link className={`navItem ${path === '/' && 'activeTab'}`} to={'/'}>Home</Link></Nav.Item>
      {/* <Nav.Item ><Link className={`navItem ${path === '/signup' && 'activeTab'}`}  to={'/signup'}>Sign Up</Link></Nav.Item> */}
      <Nav.Item ><Link className={`navItem ${path === '/addExpense' && 'activeTab'}`} to={'/addExpense'}>Add Expense</Link></Nav.Item>
    
     <Uploader accept='.csv' style={{marginTop:"10px"}} action="" onChange={(file)=>{
      setfile(file)
     }} shouldUpload={()=>false}>
      <Button>Upload Csv</Button>
    </Uploader>
     
    </Nav>
    <Nav pullRight>
      <Nav.Item icon={<ExitIcon/>}><Link className='navItem' to={'/logout'}>Logout</Link></Nav.Item>
    </Nav>
  </Navbar>
  )
  }


export default Header;