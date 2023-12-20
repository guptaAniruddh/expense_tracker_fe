import React, { useEffect, useState } from 'react'
import {Modal} from 'react-bootstrap'
import AddExpenseForm from '../forms/AddExpenseForm'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { SchemaCheckResult } from 'schema-typed'
import { Schema } from 'rsuite'
export type IExpenseValidationError = SchemaCheckResult<{title: string; amount: number; date:Date,category: string}, string>

export const expenseValidationErrors: IExpenseValidationError = {
  title: {
    hasError: false,
  },
  amount: {
    hasError: false,
  },
  date: {
    hasError: false,
  },
  category:{
    hasError:false
  }
};
const AddExpense = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [validationErrors,setValidationErrors] = useState<IExpenseValidationError>(expenseValidationErrors)
  const [response, setResponse] = useState({
    title:"",
    amount: 10,
    date: new Date(), 
    category:""
  })

  const [expenseId, setExpenseId] = useState('');
  useEffect(() => {
    if(params.id){
      setExpenseId(params.id);
    }
  }, [params.id])
  useEffect(() => {
    const DataFetch = async (id: string) => {
       await axios.get(`http://localhost:5000/api/external/expenses/${id}`,{headers:{
            token: localStorage.getItem('token')
    }}).then(res=>{
      setResponse(res.data)
    }).catch(err=>{
      window.alert("Something went wrong"+err);
    })
  }
  if(expenseId){
  DataFetch(expenseId);
  }
  },[expenseId]);

  const expenseModel = Schema.Model<{title:string,amount:number,date:Date,category:string }>({
    title:Schema.Types.StringType().isRequired('This field is mandatory'),
    amount:Schema.Types.NumberType().isRequired('This field is madatory'),
    date:Schema.Types.DateType().isRequired('Date is required to Track'),
    category:Schema.Types.StringType().isRequired('Category is required to categorise your expenses'),


     
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const field = e.target.name as 'title'|'amount'|'date'|'category'
    setResponse({
      ...response,
      [e.target.name]: val,
    });
    const partialCheck = expenseModel.checkForField(field, response);
    setValidationErrors({
      ...validationErrors,
      [field]: partialCheck
    });
  };
  const handleSubmit = async(response:{title:string,amount:number,date:Date,category:string})=>{
    try{
      const checkResult = expenseModel.check(response)
      setValidationErrors(checkResult);
      if( checkResult.title?.hasError || checkResult.amount?.hasError || checkResult.category?.hasError || checkResult.date?.hasError){
        toast.error("Error in Form FIelds")
        return;
      }
      
      await axios.post("http://localhost:5000/api/external/expenses",response,{
        headers:{
          token:localStorage.getItem('token')
        }
      })
      toast.success("Expense Added Successfully");
        navigate('/');
    } catch (error){
       toast.error(`${error}`);
    }
  }
  
  const handleEdit = async(response:{title:string,amount:Number,date:Date,category:string})=>{
    try{
      await axios.put(`http://localhost:5000/api/external/expenses/${params.id}`,response,{
        headers:{
          token:localStorage.getItem('token')
        }
      })
      toast.success("Expense Edited Successfully");
        navigate('/');
    } catch (error){
      toast.error(`${error}`);
    }
  }

  return (
    <div  className="modal show"
    style={{ display: 'block', position: 'initial' }}>
      < Modal.Dialog>
            <Modal.Header closeButton onHide={()=> {
              navigate('/');
            }}>
              <Modal.Title className='hstyle'>{!expenseId ? 'Add New Expense': 'Edit Expense'} </Modal.Title>
            </Modal.Header>
    
            <Modal.Body>
            <AddExpenseForm   handleChange ={handleChange} validationErrors={validationErrors} isEdit = {!!expenseId} handleSubmit = {expenseId ? handleEdit : handleSubmit} response ={response} setResponse ={setResponse} />

            </Modal.Body>

          </Modal.Dialog>  
    </div>
  )
}

export default AddExpense