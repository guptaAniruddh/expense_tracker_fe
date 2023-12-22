import React, { useEffect,useState } from 'react'
import {Nav,Navbar,Uploader,Button, IconButton}from "rsuite"
import HomeIcon from '@rsuite/icons/legacy/Home';
import ExitIcon from '@rsuite/icons/Exit';
import { Link, useLocation,useNavigate } from 'react-router-dom';
import { FileType } from 'rsuite/esm/Uploader';
import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { CgProfile } from "react-icons/cg"
import { MdAccountBalance } from "react-icons/md";
import CloseIcon from '@rsuite/icons/Close';
import { COLOR } from 'rsuite/esm/utils/constants';

 const Header = () => {
 const route = useLocation();
  const path = route.pathname;
  const [buttonText, setButtonText] = useState<string>("Balance");
  const handleBalance= async()=>{
    try{
    const userId = localStorage.getItem('token');
       const data:AxiosResponse<string>= await axios.get(`http://localhost:5000/api/external/user/get_balance/${userId}`)
       console.log(data.data);
       let balance = data.data.toString();
       balance ="Rs "+balance+". 00";
        setButtonText(balance.toString());

        toast.success("Balance fetched Successfully");
    }
    catch(err){
      toast.error("Sorrry some error please try after some time");
    }
  }

   const [file, setfile] = useState<FileType[]>();
   const [isOpen, setIsopen] = useState(false);

   const ToggleSidebar = () => {
    setButtonText("Balance");
       isOpen === true ? setIsopen(false) : setIsopen(true);
   }
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
    <div id ="header" >
    <Navbar appearance='inverse'>
    <Navbar.Brand>Expense Tracker</Navbar.Brand>
    <Nav>
      <Nav.Item icon={<HomeIcon/>} ><Link className={`navItem ${path === '/' && 'activeTab'}`} to={'/'}>Home</Link></Nav.Item>
      <Nav.Item ><Link className={`navItem ${path === '/addExpense' && 'activeTab'}`} to={'/addExpense'}>Add Expense</Link></Nav.Item>
    
     <Uploader accept='.csv' style={{marginTop:"10px"}} action="" onChange={(file)=>{
      setfile(file)
     }} shouldUpload={()=>false}>
      <Button>Upload Csv</Button>
    </Uploader>
     
    </Nav>
    <div className="container-fluid mt-3">
    <Nav pullRight>
                
                    
                <div className="btn btn-primary" onClick={ToggleSidebar} >
                    <IconButton icon={<CgProfile/>}></IconButton>
                </div>
          

    <div className={`sidebar ${ 
      console.log(isOpen),
       isOpen == true ? 'active' : ''}`}>
        <div className="sd-header">
            <h4 style={{color:"black" , fontFamily:"inherit"}} >Your Profile</h4>
            <div className="btn btn-primary" onClick={ToggleSidebar}><CloseIcon /></div>
        </div>
        <div  >
            
            <Nav.Item><IconButton  icon={<ExitIcon />}><Link className='navItem' to={'/logout'} style={{color:"black"}}> Logout</Link></IconButton></Nav.Item>

          
            <Nav.Item style={{}}><IconButton style={{marginLeft:"1px"}} icon={<MdAccountBalance style={{ margin:"10px"}}/>}  onClick={handleBalance}> {buttonText}</IconButton></Nav.Item>
           
            
        </div>
    </div>
    <div className={`sidebar-overlay ${isOpen == true ? 'active' : ''}`} onClick={ToggleSidebar}></div>

     

    </Nav>
    </div>

  </Navbar>
  </div>
  )
  }


export default Header;