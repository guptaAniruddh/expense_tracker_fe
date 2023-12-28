import axios from "axios";
import { expense } from "../model/expense";
import Pager from "../Atom/Pager"
const url = "http://localhost:5000/api/external/"
export  const getPageData = async (activepage :number) => {
  const endate= new Date();
  const startdate = new Date().setMonth(new Date().getMonth()-1);
    return await axios
      .get<{data: expense[], count: number}>(url+`expenses?pageNo=${activepage}&pageSize=9&startdate=${startdate}&endate=${endate}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      
    }
    export  const getPageDataWithFilter = async (activepage :number,response: {
      type: string;
      title: string;
      amount: number;
      startdate:Date;
      endate: Date;
      category: string;
    }) => {
        return await axios
          .get<{data: expense[], count: number}>(url+`expenses?pageNo=${activepage}&pageSize=9&type=${response.type}&title=${response.title}&amount=${response.amount}&startdate=${response.startdate}&endate=${response.endate}&category=${response.category}`, {
            headers: {
              token: localStorage.getItem("token"),
            },
          })
          
        }
    export const deleteExpense = async(userId:string)=>{
      await axios.delete(
        `http://localhost:5000/api/external/expenses/${userId}`,
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      );
    }
    export const getExpenseById =async (id:string) => {
      return await axios.get(`http://localhost:5000/api/external/expenses/${id}`,{
        headers:{
          token:localStorage.getItem('token')
        }
      })
      
    }
    export const editExpense=async(id:string,response:{type:string,title:string,amount:Number,date:Date,category:string}) =>{
      return await axios.put(`http://localhost:5000/api/external/expenses/${id}`,response,{
        headers:{
          token:localStorage.getItem('token')
        }
      })
      
    }
    export const addExpense = async(response:{type:string,title:string,amount:Number,date:Date,category:string})=>{
      return await axios.post("http://localhost:5000/api/external/expenses",response,{
        headers:{
          token:localStorage.getItem('token')
        }
      })
    }