import './App.css';

import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Landing from './componentes/Landing';
import Home from './componentes/Home';
import Forms from './componentes/Forms';
import Detalle from './componentes/Card';
import { filtrarPorContinente } from './redux/actions';
import FiltrosContinentes from './componentes/Filtros';
import Probandocosas from './componentes/Probandocosas';
//import Navbar from './componentes/Navbar';
//import { ordenar } from './redux/actions';
//import { obtenerPaises } from './redux/actions';
//import { useState } from 'react';





function App() {
 // const [condicion,setcondicion]=useState("ASC")
 // const [atributo,setatributo]=useState("name")
  //let atributos="name"
  //let condicions="ASC"
  return (
    <div className="App">

      <BrowserRouter>
      {/* <Navbar setatributo={setatributo} setcondicion={setcondicion} atributo={atributo} condicion={condicion}/> */}
      <h1>Henry Countries</h1>
     
      
      <Routes>
        
        <Route exact path='/' element={<Landing/>}/>
        <Route exact path='/probando' element={<Probandocosas/>}>probando</Route>
        <Route exact path='/countries'element={<Home/>}/>
        {/* //</Home> funcion={obtenerPaises}/>}/>  */}
        <Route exact path='/crear'element={<Forms/>}/>
        <Route exact path='/detail' element={<Detalle/>}/>
       
        {/* <Route path='/ordenPaises'element={[<Navbar setatributo={setatributo} setcondicion={setcondicion} atributo={atributo} condicion={condicion}/>,<Forms/>]}/> */}
        {/*<Route exact path='/ordenPaises' element={[
        <Navbar key={"navbar"}setatributo={setatributo} setcondicion={setcondicion} atributo={atributo} condicion={condicion}/>,
        
         <Home key={"home"}funcion={ordenar} atributo={atributo} condicion={condicion}/>]}/> */}


      </Routes>




      </BrowserRouter>

    </div>
  );
}

export default App;
