import { useContext, useEffect } from 'react';
import Table from 'react-bootstrap/Table';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import ModalFormulario from './ModalFormulario';
import FormEditorial from './Formularios/FormEditorial';

import useModal from '../hooks/useModal';
import useConfigFormulario from '../hooks/useConfigFormulario';

import ModalConfirmacionBorrar from './ModalConfirmacionBorrar';
import useConfigFormularioBorrar from '../hooks/useConfigFormularioBorrar';
import FormBorrar from './Formularios/FormBorrar';

import editorialContext from '../../context/editoriales/editorialContext';
import ContenedorConCarga from '../Layout/ContenedorConCarga';

const Editoriales = () => {

    const EditorialContext = useContext(editorialContext);
    const { editoriales, cargando, obtenerEditoriales, agregarEditorial, editarEditorial, eliminarEditorial } = EditorialContext;

    useEffect(() => {
        obtenerEditoriales();
        // eslint-disable-next-line
    }, []);

    const fnAgregar = (datos) => {
        agregarEditorial(datos);
        handleClose()
    }
    
    const fnEditar = (datos) => {
        editarEditorial(datos);
        handleClose()
    }

    const fnBorrar = (id) => {
        eliminarEditorial(id)
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

    // const datosEditorialPrueba = {nombre: 'Diana', descripcion: 'abcd'};

    return (
        <div>
            <main>
            <ContenedorConCarga cargando={cargando}>
            <div className="seccion">
                    <p className="titulo-seccion con-boton">Editoriales</p>
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
                    <Table responsive striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Acerca de la editorial</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {editoriales.map((editorial, i) => (
                                <tr key={`celda-editorial-${i}`}>
                                    <td>{editorial.name}</td>
                                    <td>{editorial.about}</td>
                                    <td>
                                        <IconButton onClick={() => editar(editorial)}> <EditIcon/> </IconButton>
                                        <IconButton onClick={() => borrar(editorial.id)}> <DeleteIcon/> </IconButton>
                                    </td>
                                </tr>
                            ))}
                            {/* <tr>
                                <td>Diana</td>
                                <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem beatae eum dicta repudiandae, mollitia non a omnis illum deserunt quo perferendis veritatis, nihil eveniet, sapiente odit! Nobis enim placeat reiciendis.</td>
                                <td>
                                    <IconButton onClick={() => editar(datosEditorialPrueba)}> <EditIcon/> </IconButton>
                                    <IconButton> <DeleteIcon/> </IconButton>
                                </td>
                            </tr>
                            <tr>
                                <td>Diana</td>
                                <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem beatae eum dicta repudiandae, mollitia non a omnis illum deserunt quo perferendis veritatis, nihil eveniet, sapiente odit! Nobis enim placeat reiciendis.</td>
                                <td>
                                    <IconButton onClick={() => editar(datosEditorialPrueba)}> <EditIcon/> </IconButton>
                                    <IconButton> <DeleteIcon/> </IconButton>
                                </td>
                            </tr>
                            <tr>
                                <td>Diana</td>
                                <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem beatae eum dicta repudiandae, mollitia non a omnis illum deserunt quo perferendis veritatis, nihil eveniet, sapiente odit! Nobis enim placeat reiciendis.</td>
                                <td>
                                    <IconButton onClick={() => editar(datosEditorialPrueba)}> <EditIcon/> </IconButton>
                                    <IconButton> <DeleteIcon/> </IconButton>
                                </td>
                            </tr> */}
                        </tbody>
                    </Table>
                </div>
            </ContenedorConCarga>
                

                <ModalFormulario seccion="editorial" estado={configForm.estado} show={show} onHide={handleClose} >
                    <FormEditorial datos={configForm.datos} afterValidationAction ={configForm.accion} />
                </ModalFormulario>

                <ModalConfirmacionBorrar entidad='la editorial' show={showBorrar} onHide={handleCloseBorrar}>
                    <FormBorrar id={configBorrar.id} afterConfirmAction ={configBorrar.accion} cancelAction={handleCloseBorrar}/>
                </ModalConfirmacionBorrar>

            </main>
        </div>
    );
}
 
export default Editoriales;