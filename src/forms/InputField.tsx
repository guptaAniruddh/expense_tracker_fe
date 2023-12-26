import React from 'react'
import { Button  } from 'react-bootstrap'
import { Link } from 'react-router-dom'
interface Props{
  handleSubmit: (response: {username: string, password: string})=> Promise<void> 
  setResponse: React.Dispatch<React.SetStateAction<{username: string, password: string}>>
  response: {username: string, password: string}
}
const InputField = ({handleSubmit, setResponse, response}:Props) => {
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
const val = e.target.value;
setResponse({
  ...response,
  [e.target.name]:val

})

  }
 
  return (
    <div className='divstyle'>
       <h3 style={{ marginBottom: 10 }}>Login</h3>
        <div className='form'>
        <div className='formItem'>
          <label htmlFor="username" className='labelStyle'>Username</label>
          <input type="text" value={response.username} className='inputStyle' name='username'placeholder='Username' onChange={handleChange}/>
        </div>
        <div  className='formItem'>
          <label htmlFor="Password" className='labelStyle'>Password</label>
          <input type="password" value={response.password} className='inputStyle' name='password'placeholder='Password'  onChange={handleChange}/>
        </div>
          <br/>
          <Link to ={'/signUp'}> New to Expense Tracker? Please Sign up </Link>
          <br/>
          <Button  type="submit" className='buttonStyle'onClick={()=>handleSubmit(response)}>Login</Button>
        </div>
        </div>
  )
}

export default InputField