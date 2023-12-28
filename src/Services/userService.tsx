import React from 'react'
import axios from 'axios'
export const login = async(response: {username: string, password: string})=>{
    return await axios.post("http://localhost:5000/api/external/user/login",response)
    

}
export const signup =async (response:{username:string,email:string,password:string}) => {
   return await axios.post("http://localhost:5000/api/external/user/signup",response);
    
}
