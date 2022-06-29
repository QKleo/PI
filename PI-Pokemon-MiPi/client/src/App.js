import './App.css';
import {Route,Routes,BrowserRouter} from 'react-router-dom';
import Home from './components/Home';
import Landing from './components/Landing';
import Forms from './components/Forms';
import Detail from './components/Detail';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
     
       <Routes>
          <Route exact path='/' element={<Landing/>}/>
          <Route exact path='/pokemons'element={<Home/>}/> 
          <Route exact path='/formulario'element={<Forms/>}/>
          <Route exact path='/detail' element={<Detail/>}/>
       </Routes>

      
      </BrowserRouter>
    </div>
  );
}

export default App;
