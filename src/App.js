import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/Navbar/NavBar';
import ItemDetailContainer from './containers/ItemDetailContainer/ItemDetailContainer';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import CartContextProvider from './context/CarContext';
import CartItemContainer from './containers/CartItemContainer/CartItemContainer';
import ItemListContainer from './containers/ItemListContainer/ItemListContainer';



function App() {
  return (
    <div className="App">
      <BrowserRouter>      
        <CartContextProvider>
          <NavBar/>
          <Routes>
            <Route exact path='/'             
              element={ <ItemListContainer /> }              
            />
            <Route path='/categoria/:Id' 
                    element={ <ItemListContainer /> }
            />
            <Route path='/detalle/:detalleId' 
                    element={ <ItemDetailContainer  /> }
            />
            <Route path='/item/:detalleId' 
                    element={ <ItemDetailContainer  /> }
            />
            <Route path='/cartList' 
                    element={ <CartItemContainer/> }
            />
            <Route path='/*' element={<Navigate to='/' />} />
          </Routes>
        </CartContextProvider>
      </BrowserRouter>     
    </div>
  );
}

export default App;
