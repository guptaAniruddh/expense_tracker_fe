
import './App.css'
import Header from './component/Header';
import DataFetch from './component/DataFetch';
import React from 'react';
import Sidebar from './component/Sidebar';
function App() {

  // const [islogin,setLogin]=useState<boolean>(false);
  return (
    <div >
    <div>
    <Header/>
    <DataFetch />
    </div>
    </div>  

    );
}

export default App;
