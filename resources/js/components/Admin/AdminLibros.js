import { useContext, useEffect } from 'react';
import Table from 'react-bootstrap/Table';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

import ModalFormulario from './ModalFormulario';
import FormLibro from './Formularios/FormLibro';

import useModal from '../hooks/useModal';
import useConfigFormulario from '../hooks/useConfigFormulario';

import ContenedorConCarga from '../Layout/ContenedorConCarga';
import ModalConfirmacionBorrar from './ModalConfirmacionBorrar';
import useConfigFormularioBorrar from '../hooks/useConfigFormularioBorrar';
import FormBorrar from './Formularios/FormBorrar';

import libroContext from '../../context/libros/libroContext';
import authContext from '../../context/autenticacion/authContext';


const AdminLibros = () => {

    const AuthContext = useContext(authContext);
    const { rol } = AuthContext;

    const LibroContext = useContext(libroContext);
    const { libros, cargando, obtenerLibros, agregarLibro, editarLibro, eliminarLibro } = LibroContext;

    useEffect(() => {
        obtenerLibros();
        // eslint-disable-next-line
    }, []);

    const fnAgregar = (datos) => {
        agregarLibro(datos);
        handleClose()
    }
    
    const fnEditar = (datos) => {
        editarLibro(datos)
        handleClose()
    }

    const fnBorrar = (id) => {
        eliminarLibro(id)
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
    
    // const datosLibroPrueba = {titulo: 'Diana', descripcion: 'abcd', precio: 350, existencias: 15, categoria_id: 1, autor_id: 1, editorial_id: 1};

    return (
        <div>
            <main>
                <ContenedorConCarga cargando={cargando}>
                    <div className="seccion">
                        <p className="titulo-seccion con-boton">Libros</p>
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
                                    <th>Título</th>
                                    <th>Descripción</th>
                                    <th>Precio</th>
                                    <th>Existencias</th>
                                    <th>Categoría</th>
                                    <th>Autor</th>
                                    <th>Editorial</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {libros.map((libro, i) => (
                                    <tr key={`celda-libro-${i}`}>
                                        <td>{libro.title}</td>
                                        <td>{libro.description}</td>
                                        <td>${libro.price}</td>
                                        <td>{libro.stock}</td>
                                        <td>{libro.category}</td>
                                        <td>{libro.author}</td>
                                        <td>{libro.publisher}</td>
                                        <td>
                                            
                                            {rol?.allow_write ? <IconButton onClick={() => editar(libro)}> <EditIcon/> </IconButton> : null}
                                            {rol?.allow_delete ? <IconButton onClick={() => borrar(libro.id)}> <DeleteIcon/> </IconButton> : null}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </ContenedorConCarga>
                
                <ModalFormulario size="lg" seccion="libro" estado={configForm.estado} show={show} onHide={handleClose}>
                    <FormLibro datos={configForm.datos} afterValidationAction ={configForm.accion} />
                </ModalFormulario>

                <ModalConfirmacionBorrar entidad='el libro' show={showBorrar} onHide={handleCloseBorrar}>
                    <FormBorrar id={configBorrar.id} afterConfirmAction ={configBorrar.accion} cancelAction={handleCloseBorrar}/>
                </ModalConfirmacionBorrar>

            </main>
        </div>
    );
}
 
export default AdminLibros;