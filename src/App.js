import './App.css';

import {Home} from "./Home";
import BuscaPostoMaisProx from "./BuscaPostoMaisProx";
import {CadastroDeAvaliacao} from './CadastroDeAvaliacao';
import {CadastroDePreco} from './CadastroDePreco';
import {CriacaoDePosto} from './CriacaoDePosto';
import {ListaPostosCadastrados} from './ListaPostosCadastrados';
import {TipoDeCombustivel} from './TipoDeCombustivel';
import {Navigation} from './Navigation';
import Logo from './logo';

import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
      <Logo/>
      
       <h3 className="m-3 d-flex justify-content-center">
         Consulta Postos
       </h3>
       <Navigation/>

       <Routes>
         <Route path='/' element={<Home/>} exact/>
         <Route path='/buscaposto' element={<BuscaPostoMaisProx/>}/>
         <Route path='/avaliacao' element={<CadastroDeAvaliacao/>}/>
         <Route path='/preco' element={<CadastroDePreco/>}/>
         <Route path='/posto' element={<CriacaoDePosto/>}/>
         <Route path='listapostos' element={<ListaPostosCadastrados/>}/>
         <Route path='/tipocombustivel' element={<TipoDeCombustivel/>}/>
       </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
