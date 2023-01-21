import * as React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import LayoutTienda from './Layout/LayoutTienda'
import LayoutAdmin from './Layout/LayoutAdmin'
import Home from './Clientes/Home'
import Categorias from './Clientes/Categorias';
import Carrito from './Clientes/Carrito';
import Categoria from './Clientes/Categoria';
import Login from '../components/Auth/Login';
import Registro from './Auth/Registro';
import WishList from './Clientes/WishList';
import MisCompras from './Clientes/MisCompras';
import Libros from './Clientes/Libros';
import Libro from './Clientes/Libro';
import Ventas from './Admin/Ventas';
import AdminCategorias from './Admin/AdminCategorias';
import AdminLibros from './Admin/AdminLibros';
import Autores from './Admin/Autores';
import Editoriales from './Admin/Editoriales';
import Usuarios from './Admin/Usuarios';
import Roles from './Admin/Roles';
import ContextContainer from './ContextContainer';
import tokenAuth from '../config/tokenAuth';
// import '../../css/app.css';

// Revisar si tenemos un token
const token = localStorage.getItem('token');
if (token) {
  tokenAuth(token);
}

export default function App() {
  return (
    <ContextContainer>
        <BrowserRouter>
            <div className='App'>
                <Routes>
                    <Route exact path='/' element={<LayoutTienda/>}>
                        <Route index element={<Home/>} />
                        <Route path="categorias" element={<Categorias />}>
                            <Route path=":categoriaId" element={<Categoria />} />
                        </Route>
                        <Route path="libros" element={<Libros />}>
                            <Route path=":libroId" element={<Libro />} />
                        </Route>
                        <Route path='carrito' element={<Carrito/>} />
                        <Route path='wishlist' element={<WishList/>} />
                        <Route path='mis_compras' element={<MisCompras/>} />
                    </Route>

                    <Route exact path='consola' element={<LayoutAdmin/>}>
                        <Route index element={<Ventas/>} />
                        <Route path='ventas' element={<Ventas/>} />
                        <Route path='libros' element={<AdminLibros/>} />
                        <Route path='categorias' element={<AdminCategorias/>} />
                        <Route path='autores' element={<Autores/>} />
                        <Route path='editoriales' element={<Editoriales/>} />
                        <Route path='usuarios' element={<Usuarios/>} />
                        <Route path='roles' element={<Roles/>} />
                    </Route>

                    <Route exact path='login' element={<Login/>} />
                    <Route exact path='registro' element={<Registro/>} />
                </Routes>
            </div>
        </BrowserRouter>
    </ContextContainer>
  )
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}