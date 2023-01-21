import { useState, useContext } from 'react';
// import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import "./TopBar.css";

import authContext from '../../context/autenticacion/authContext';

const TopBar = () => {
    const AuthContext = useContext(authContext);
    const { nombre, cerrarSesion } = AuthContext;

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // const usuario = 'Juan González'

    return (
        <nav className='navbar-admin z-depth-0'>
            <h1 className="navbar-admin-title black-text">Panel de administración</h1>
            <>
                {/* <Tooltip title={'Test'}> */}
                    {/* <button className="navbar-button" onClick={() => {}}>Hoy</button> */}
                    {/* <Button className="navbar-button" variant="outlined" disableElevation onClick={() => {actualizarDia(moment())}}>Hoy</Button> */}
                {/* </Tooltip> */}
                {/* <select className="navbar-select browser-default">
                    <option value="mes">Mes</option>
                    <option value="agenda">Agenda</option>
                </select> */}
            </>
                
            <div className='navbar-admin-nav'>
                {/* <Avatar alt="foto de perfil" src="https://xsgames.co/randomusers/avatar.php?g=male" /> */}
                <p className='nombre' >{nombre}</p>
                <IconButton 
                    onClick={handleClick}
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <ArrowDropDownIcon/>
                </IconButton>
            </div>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                {/* <MenuItem onClick={()=>{}}>Mi cuenta</MenuItem> */}
                <MenuItem onClick={cerrarSesion}>Cerrar Sesión</MenuItem>
            </Menu>   
        </nav>
    );
}
 
export default TopBar;