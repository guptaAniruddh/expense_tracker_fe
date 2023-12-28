import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import 'rsuite/dist/rsuite.min.css';
import './index.css';
import { Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Logout from './organsm/Logout';
import AddExpense from './pages/AddExpense';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import App from './App';
import { BrowserRouter, Routes } from 'react-router-dom';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
  <BrowserRouter>
  <ToastContainer/>
    <Routes>
      <Route path='/' element={localStorage.getItem('token')?<App/>:<Login/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<SignUp/>} />
      <Route path ='/logout' element={<Logout/>}></Route>
      <Route path = '/editExpense/:id' element={<AddExpense/>}></Route>
      <Route path = '/addExpense' element={<AddExpense/>}></Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vital

