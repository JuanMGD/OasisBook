import { useEffect, useContext } from 'react';
// import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
// import tokenAuth from '../config/tokenAuth';

import Footer from '../Clientes/Footer';

// import { BsFillHeartFill, BsFillCartFill } from "react-icons/bs";

import { Link, Outlet, useNavigate } from "react-router-dom";

import categoriaContext from '../../context/categorias/categoriaContext';
import authContext from '../../context/autenticacion/authContext';

const LayoutTienda = () => {
    const CategoriaContext = useContext(categoriaContext);
    const { categorias, obtenerCategorias } = CategoriaContext;

    const AuthContext = useContext(authContext);
    const { token, usuarioAutenticado, nombre, cerrarSesion } = AuthContext;

    const navigate = useNavigate();

    useEffect(() => {
      // const token = localStorage.getItem('token');
      // if (token) {
      //   tokenAuth(token);
      // }
      // usuarioAutenticado();
      // obtenerCategorias();
      // eslint-disable-next-line
    }, []);
    
    useEffect(() => {
      console.log(token);
      if (token === null) navigate("/login");
      else obtenerCategorias();
      // eslint-disable-next-line
    }, [token]);

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to={`/`} className="logo-nav-cliente">OasisBook</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {/* <Nav.Link href="#features">Novelas</Nav.Link> */}
              {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
              <NavDropdown title="Categorías" id="collasible-nav-dropdown">
                {categorias.map(({id, name}) => (
                  <NavDropdown.Item as={Link}
                    // style={{ display: "block", margin: "1rem 0" }}
                    to={`/categorias/${id}`}
                    key={`menu-categoria-${id}`}
                  >
                    {name}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </Nav>
            <Nav>
              {/* <Nav.Link href="#deets">Lista de deseos</Nav.Link> */}
              <Nav.Link as={Link} to={`/carrito`}> Carrito</Nav.Link>
              {/* <Nav.Link eventKey={2} href="#memes">
                Juan González
              </Nav.Link> */}
              <NavDropdown title={nombre} id="collasible-nav-dropdown">
                {/* <NavDropdown.Item href="#action/3.1">Cuenta</NavDropdown.Item> */}
                <NavDropdown.Item as={Link} to={`/wishlist`}>Lista de deseos</NavDropdown.Item>
                <NavDropdown.Item as={Link} to={`/mis_compras`}>Mis compras</NavDropdown.Item>
                {/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item> */}
                <NavDropdown.Divider />
                <NavDropdown.Item href="#" onClick={cerrarSesion}>
                  Cerrar sesión
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      <Outlet />
      
      <Footer/>
    </>
  );
}

export default LayoutTienda;