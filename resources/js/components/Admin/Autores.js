import { useContext, useEffect } from 'react';
import Table from 'react-bootstrap/Table';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

import ModalFormulario from './ModalFormulario';
import FormAutor from './Formularios/FormAutor';

import useModal from '../hooks/useModal';
import useConfigFormulario from '../hooks/useConfigFormulario';

import ModalConfirmacionBorrar from './ModalConfirmacionBorrar';
import useConfigFormularioBorrar from '../hooks/useConfigFormularioBorrar';
import FormBorrar from './Formularios/FormBorrar';

import autorContext from '../../context/autores/autorContext';
import ContenedorConCarga from '../Layout/ContenedorConCarga';

const Autores = () => {

    const AutorContext = useContext(autorContext);
    const { autores, cargando, obtenerAutores, agregarAutor, editarAutor, eliminarAutor } = AutorContext;

    useEffect(() => {
        obtenerAutores();
        // eslint-disable-next-line
    }, []);


    const fnAgregar = (datos) => {
        agregarAutor(datos);
        handleClose()
    }
    
    const fnEditar = (datos) => {
        editarAutor(datos);
        handleClose()
    }

    const fnBorrar = (id) => {
        eliminarAutor(id)
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

    // const datosAutorPrueba = {nombre: 'Gabriel García Márquez', presentacion: 'abcd'};

    return (
        <div>
            <main>
            <ContenedorConCarga cargando={cargando}>
            <div className="seccion">
                    <p className="titulo-seccion con-boton">Autores</p>
                    <Button sx={{ 
                        // fontSize: '0.75rem',
                        textTransform: 'none', 
                        color: '#079dc7',
                        margin: '0 0.25rem 0 auto', 
                        alignSelf: 'center',
                    }}
                    onClick={agregar}
                    >
                        Agregar
                    </Button>
                    <Table responsive striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Acerca del autor</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {autores.map((autor, i) => (
                                <tr key={`celda-autor-${i}`}>
                                    <td>{autor.name}</td>
                                    <td>{autor.about}</td>
                                    <td>
                                        <IconButton onClick={() => editar(autor)}> <EditIcon/> </IconButton>
                                        <IconButton onClick={() => borrar(autor.id)}> <DeleteIcon/> </IconButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>

            </ContenedorConCarga>
                
                <ModalFormulario seccion="autor" estado={configForm.estado} show={show} onHide={handleClose} >
                    <FormAutor datos={configForm.datos} afterValidationAction ={configForm.accion} />
                </ModalFormulario>

                <ModalConfirmacionBorrar entidad='el autor' show={showBorrar} onHide={handleCloseBorrar}>
                    <FormBorrar id={configBorrar.id} afterConfirmAction ={configBorrar.accion} cancelAction={handleCloseBorrar}/>
                </ModalConfirmacionBorrar>

            </main>
        </div>
    );
}
 
export default Autores;