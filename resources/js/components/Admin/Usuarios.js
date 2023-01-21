import { useContext, useEffect } from 'react';
import Table from 'react-bootstrap/Table';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import ModalFormulario from './ModalFormulario';
import FormUsuario from './Formularios/FormUsuario';

import useModal from '../hooks/useModal';
import useConfigFormulario from '../hooks/useConfigFormulario';

import ModalConfirmacionBorrar from './ModalConfirmacionBorrar';
import useConfigFormularioBorrar from '../hooks/useConfigFormularioBorrar';
import FormBorrar from './Formularios/FormBorrar';

import { useNavigate } from "react-router-dom";

import usuarioContext from '../../context/usuarios/usuarioContext';
import authContext from '../../context/autenticacion/authContext';
import ContenedorConCarga from '../Layout/ContenedorConCarga';

const Usuarios = () => {

    const UsuarioContext = useContext(usuarioContext);
    const { usuarios, cargando, obtenerUsuarios, agregarUsuario, editarUsuario, eliminarUsuario } = UsuarioContext;

    const AuthContext = useContext(authContext);
    const { rol } = AuthContext;

    const navigate = useNavigate();

    useEffect(() => {
      if (!rol && !rol.allow_manage_users) navigate("/consola");
    }, [rol]);

    useEffect(() => {
        obtenerUsuarios();
        // eslint-disable-next-line
    }, []);

    const fnAgregar = (datos) => {
        agregarUsuario(datos);
        handleClose()
    }
    
    const fnEditar = (datos) => {
        editarUsuario(datos);
        handleClose()
    }

    const fnBorrar = (id) => {
        eliminarUsuario(id)
        handleCloseBorrar()
    }
    
    const [show, handleClose, handleShow] = useModal();
    const [showBorrar, handleCloseBorrar, handleShowBorrar] = useModal();
    const [configForm, agregar, editar] = useConfigFormulario({
        mostrar: handleShow,
        fnAgregar,
        fnEditar
    });
    const [configBorrar, borrar] = useConfigFormularioBorrar(handleShowBorrar, fnBorrar);

    // const datosUsuarioPrueba = {correo: 'juanduron57@gmail.com', password: '1234', nombre: 'Juan Manuel González Durón', rol_id: 1};

    return (
        <div>
            <main>
            <ContenedorConCarga cargando={cargando}>
            <div className="seccion">
                    <p className="titulo-seccion con-boton">Usuarios</p>
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
                        <Table striped bordered hover className='tabla-full'>
                            <thead>
                                <tr>
                                    <th>Correo</th>
                                    <th>Nombre</th>
                                    <th>Rol</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios.map((usuario, i) => (
                                    <tr key={`celda-usuario-${i}`}>
                                        <td>{usuario.email}</td>
                                        <td>{usuario.name}</td>
                                        <td>{usuario.role ?? 'Cliente'}</td>
                                        <td>
                                            <IconButton onClick={() => editar(usuario)}> <EditIcon/> </IconButton>
                                            <IconButton onClick={() => borrar(usuario.id)}> <DeleteIcon/> </IconButton>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </ContenedorConCarga>

                <ModalFormulario seccion="usuario" estado={configForm.estado} show={show} onHide={handleClose} >
                    <FormUsuario datos={configForm.datos} afterValidationAction ={configForm.accion} />
                </ModalFormulario>

                <ModalConfirmacionBorrar entidad='el usuario' show={showBorrar} onHide={handleCloseBorrar}>
                    <FormBorrar id={configBorrar.id} afterConfirmAction ={configBorrar.accion} cancelAction={handleCloseBorrar}/>
                </ModalConfirmacionBorrar>

            </main>
        </div>
    );
}
 
export default Usuarios;