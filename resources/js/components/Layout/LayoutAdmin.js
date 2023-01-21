import { useEffect, useContext } from 'react';

import TopBar from '../Layout/TopBar';
import Sidebar from '../Layout/Sidebar';
import { Outlet, useNavigate } from "react-router-dom";

import authContext from '../../context/autenticacion/authContext';

const LayoutAdmin = () => {
    const AuthContext = useContext(authContext);
    const { token, rol, cargando, usuarioAutenticado } = AuthContext;

    const navigate = useNavigate();

    useEffect(() => {
        // usuarioAutenticado();
    }, []);

    useEffect(() => {
      console.log(rol);
      if (!token) navigate("/login");
      if (token && !rol) navigate("/");
    }, [token, rol]);

    return (
        <>
            <TopBar/>
            <Sidebar/>
            <Outlet />
        </>
    );
}
 
export default LayoutAdmin;