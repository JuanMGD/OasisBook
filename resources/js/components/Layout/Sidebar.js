import { useContext } from 'react';
import { BsCashCoin, BsPeople, BsViewStacked, BsBook, BsPen, BsPersonBadge, BsFileText, } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import './Sidebar.css';

import authContext from '../../context/autenticacion/authContext';

const Sidebar = () => {
    const AuthContext = useContext(authContext);
    const { rol } = AuthContext;

    return (
        <nav className='sidebar'>
            <ul className='sidebar-nav'>
                <div className="logo">
                    {/* <img src={logo} alt='logo'/> */}
                    <span className='link-text'>OasisBook</span>
                </div>

                <li className='sidenav-item'>
                    <NavLink to="/consola/ventas" exact="true" className={({ isActive }) => isActive ? "active-link sidenav-link" : "sidenav-link"}>
                        <BsCashCoin/>
                        <span className='link-text'>Ventas</span>
                    </NavLink>
                </li>
                <li className='sidenav-item'>
                    <NavLink to="/consola/libros" className={({ isActive }) => isActive ? "active-link sidenav-link" : "sidenav-link"}>
                        <BsBook/>
                        <span className='link-text'>Libros</span>
                    </NavLink>
                </li>
                <li className='sidenav-item'>
                    <NavLink to="/consola/categorias" className={({ isActive }) => isActive ? "active-link sidenav-link" : "sidenav-link"}>
                        <BsViewStacked/>
                        <span className='link-text'>Categorías</span>
                    </NavLink>
                </li>
                <li className='sidenav-item'>
                    <NavLink to="/consola/autores" className={({ isActive }) => isActive ? "active-link sidenav-link" : "sidenav-link"}>
                        <BsPen/>
                        <span className='link-text'>Autores</span>
                    </NavLink>
                </li>
                <li className='sidenav-item'>
                    <NavLink to="/consola/editoriales" className={({ isActive }) => isActive ? "active-link sidenav-link" : "sidenav-link"}>
                        <BsFileText/>
                        <span className='link-text'>Editoriales</span>
                    </NavLink>
                </li>
                {rol?.allow_manage_users
                ?
                <li className='sidenav-item'>
                    <NavLink to="/consola/usuarios" className={({ isActive }) => isActive ? "active-link sidenav-link" : "sidenav-link"}>
                        <BsPeople/>
                        <span className='link-text'>Usuarios</span>
                    </NavLink>
                </li>
                : null
                }
                {rol?.allow_manage_roles
                ?
                <li className='sidenav-item'>
                    <NavLink to="/consola/roles" className={({ isActive }) => isActive ? "active-link sidenav-link" : "sidenav-link"}>
                        <BsPersonBadge/>
                        <span className='link-text'>Roles</span>
                    </NavLink>
                </li>
                : null
                }
            </ul>
        </nav> 
    );
}
 
export default Sidebar;