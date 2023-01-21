import { useContext, useEffect } from 'react';
import Table from 'react-bootstrap/Table';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import ModalFormulario from './ModalFormulario';
import FormRol from './Formularios/FormRol';

import useModal from '../hooks/useModal';
import useConfigFormulario from '../hooks/useConfigFormulario';

import ModalConfirmacionBorrar from './ModalConfirmacionBorrar';
import useConfigFormularioBorrar from '../hooks/useConfigFormularioBorrar';
import FormBorrar from './Formularios/FormBorrar';

import { useNavigate } from "react-router-dom";

import rolContext from '../../context/roles/rolContext';
import authContext from '../../context/autenticacion/authContext';
import ContenedorConCarga from '../Layout/ContenedorConCarga';

const Roles = () => {

    const RolContext = useContext(rolContext);
    const { roles, cargando, obtenerRoles, agregarRol, editarRol, eliminarRol } = RolContext;

    const AuthContext = useContext(authContext);
    const { rol } = AuthContext;

    const navigate = useNavigate();

    useEffect(() => {
      if (!rol && !rol.allow_manage_roles) navigate("/consola");
    }, [rol]);

    useEffect(() => {
        obtenerRoles();
        // eslint-disable-next-line
    }, []);

    const fnAgregar = (datos) => {
        agregarRol(datos);
        handleClose()
    }
    
    const fnEditar = (datos) => {
        editarRol(datos);
        handleClose()
    }

    const fnBorrar = (id) => {
        eliminarRol(id)
        handleCloseBorrar()
    }
    
    const [show, handleClose, handleShow] = useModal();
    const [showBorrar, handleCloseBorrar, handleShowBorrar] = useModal();
    const [configForm, agregar, editar] = useConfigFormulario({
        mostrar: handleShow,
        fnAgregar: fnAgregar, 
        fnEditar: fnEditar
    });
    const [configBorrar, borrar] = useConfigFormularioBorrar(handleShowBorrar, fnBorrar);

    const datosRolPrueba = {nombre: 'Administrador', leer: true, escribir: true, eliminar: true, gestionar_usuarios: true, gestionar_roles: true};

    return (
        <div>
            <main>
            <ContenedorConCarga cargando={cargando}>
            <div className="seccion">
                    <p className="titulo-seccion con-boton">Roles</p>
                    <Button sx={{ 
                        textTransform: 'none', 
                        color: '#079dc7',
                        margin: '0 0.25rem 0 auto', 
                        alignSelf: 'center',
                        }}
                        onClick={agregar}
                    >
                        Agregar
                    </Button>
                    <div className='tabla-full'>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Rol</th>
                                    <th>Leer</th>
                                    <th>Escribir</th>
                                    <th>Eliminar</th>
                                    <th>Gestionar usuarios</th>
                                    <th>Gestionar roles</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {roles.map((rol, i) => (
                                    <tr key={`celda-rol-${i}`}>
                                        <td>{rol.name}</td>
                                        <td>{rol.allow_read ? 'Sí' : 'No'}</td>
                                        <td>{rol.allow_write ? 'Sí' : 'No'}</td>
                                        <td>{rol.allow_delete ? 'Sí' : 'No'}</td>
                                        <td>{rol.allow_manage_users ? 'Sí' : 'No'}</td>
                                        <td>{rol.allow_manage_roles ? 'Sí' : 'No'}</td>
                                        <td>
                                            <IconButton onClick={() => editar(rol)}> <EditIcon/> </IconButton>
                                            <IconButton onClick={() => borrar(rol.id)}> <DeleteIcon/> </IconButton>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </ContenedorConCarga>
                

                <ModalFormulario seccion="rol" estado={configForm.estado} show={show} onHide={handleClose} >
                    <FormRol datos={configForm.datos} afterValidationAction ={configForm.accion} />
                </ModalFormulario>

                <ModalConfirmacionBorrar entidad='el rol' show={showBorrar} onHide={handleCloseBorrar}>
                    <FormBorrar id={configBorrar.id} afterConfirmAction ={configBorrar.accion} cancelAction={handleCloseBorrar}/>
                </ModalConfirmacionBorrar>

            </main>
        </div>
    );
}
 
export default Roles;