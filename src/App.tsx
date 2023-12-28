
import './App.css'
import Header from './organsm/Header';
import DataFetch from './organsm/DataFetch';
import React, { useState } from 'react';
import FilterForm from './organsm/FilterForm';
import { expense } from './model/expense';
function App(){
  const [activepage, setactivepage] = useState<number>(1);
  const [expenses, setExpenses] = useState<expense[]>([]);
  // const [islogin,setLogin]=useState<boolean>(false);
  return (
    <div >
    <div>
    <Header />
    {/* <FilterForm  activepage={activepage} setactivepage={setactivepage} expenses={expenses} setExpenses={setExpenses}/> */}
    <DataFetch activepage={activepage} setactivepage={setactivepage} expenses={expenses} setExpenses={setExpenses} />
    </div>
    </div>  

    );
}

export default App;
