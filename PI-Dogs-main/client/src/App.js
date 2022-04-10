import './App.css';
import {Route,Routes,BrowserRouter} from 'react-router-dom'
import Landing from './components/Landing';
import Home from './components/Home';
import Forms from './components/Forms';
import Detail from './components/Detail';

function App() {
  return (
    <div className="App">
      


     
      <BrowserRouter>
        <h1>Henry Dogs</h1>
        <Routes>
          <Route exact path='/' element={<Landing/>}/>
          <Route exact path='/dogs'element={<Home/>}/>
          <Route exact path='/forms'element={<Forms/>}/>
        
          <Route exact path='/detail'element={<Detail/>}/>
        
        </Routes>

      </BrowserRouter>  
     
    </div>
  );
}

export default App;
