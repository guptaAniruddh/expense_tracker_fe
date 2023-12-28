import { Form, Button } from "rsuite";
import {InputPicker} from "rsuite";
import React from 'react'
import { useState } from "react";
import { getPageData } from "../Services/expenseService";
import { expense } from "../model/expense";
interface Props{
    activepage:number,
    setactivepage:React.Dispatch<React.SetStateAction<number>>,
    expenses:expense[],
    setExpenses:React.Dispatch<React.SetStateAction<expense[]>>
  
  }
const FilterForm = ({activepage,setactivepage,expenses,setExpenses}:Props) => {
    
    const handleSubmit = async() =>{
        if(!response.type && !response.title && !response.amount && !response.category && !response.date){
            return;
        }
        else {
            getPageData(activepage);
        }
    }
    const [response, setResponse] = useState({
        type:"",
        title:"",
        amount: 10,
        date: new Date(), 
        category:""
      })
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setResponse({
          ...response,
          [e.target.name]: val,
        })
    }
    var list1 = ['Credit','Debit'].map(
        item => ({ label: item, value: item })
      );
  return (
    <div>
        <Form layout="inline" style={{marginTop:"10px ",marginLeft:"10px"}}>
        <InputPicker data={list1} style={{ width: 112 }}
    onChange={(value) => {
      if(value){
        setResponse({...response, type: value})
      }
     } } value={response.type} appearance="default"  placeholder=" Type"  defaultValue="Entertainment" > 
  </InputPicker>
  
    <Form.Group controlId="title" onChange={handleChange}>
      <Form.ControlLabel>Title</Form.ControlLabel>
      <Form.Control name="title" style={{ width: 120 }} value={response.title}/>
    </Form.Group>
    <Form.Group controlId="amount" onChange={handleChange}>
      <Form.ControlLabel>Amount</Form.ControlLabel>
      <Form.Control name="amount" style={{ width: 120 }} value={response.amount}/>
    </Form.Group>
    <Form.Group controlId="date" onChange={handleChange}>
          <Form.ControlLabel>Date</Form.ControlLabel>
          <Form.Control  style={{width:120}} name="date" type="date" value={new Date(response.date).toISOString().split('T')[0]} />
          </Form.Group>
          <Form.Group controlId="category" onChange={handleChange}>
      <Form.ControlLabel>Category</Form.ControlLabel>
      <Form.Control name="title" style={{ width: 120 }} value={response.category}/>
    </Form.Group>
    <Button appearance="primary" onClick={handleSubmit}>Apply Filters</Button>
    </Form>
    
    </div>
  )
}

export default FilterForm
        