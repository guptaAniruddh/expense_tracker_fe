
import './App.css'
import Header from './component/Header';
import DataFetch from './component/DataFetch';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
function App() {
  const queryClient = new QueryClient();
  // const [islogin,setLogin]=useState<boolean>(false);
  return (
    <div className="App"> 
    <Header/> 
    <QueryClientProvider client={queryClient}>
      
      <DataFetch />

    </QueryClientProvider>
    </div>
  );
}

export default App;
