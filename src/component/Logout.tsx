import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem('token');
    toast.success("You are logged out,Login to contiue");
    navigate('/login', { replace: true })
  }, )
  return (
    <></>
  )
}

export default Logout