import { useContext, useEffect } from 'react';
import Table from 'react-bootstrap/Table';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

import ModalFormulario from './ModalFormulario';
import FormCategoria from './Formularios/FormCategoria';

import useModal from '../hooks/useModal';
import useConfigFormulario from '../hooks/useConfigFormulario';

import ModalConfirmacionBorrar from './ModalConfirmacionBorrar';
import useConfigFormularioBorrar from '../hooks/useConfigFormularioBorrar';
import FormBorrar from './Formularios/FormBorrar';

import categoriaContext from '../../context/categorias/categoriaContext';
import ContenedorConCarga from '../Layout/ContenedorConCarga';

const AdminCategorias = () => {

    const CategoriaContext = useContext(categoriaContext);
    const { categorias, cargando, obtenerCategorias, agregarCategoria, editarCategoria, eliminarCategoria } = CategoriaContext;

    useEffect(() => {
        obtenerCategorias();
        // eslint-disable-next-line
    }, []);

    const fnAgregar = (datos) => {
        agregarCategoria(datos);
        handleClose()
    }
    
    const fnEditar = (datos) => {
        editarCategoria(datos);
        handleClose()
    }

    const fnBorrar = (id) => {
        eliminarCategoria(id)
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

    // const datosCategoriaPrueba = {nombre: 'Drama', descripcion: 'abcd'};

    return (
        <div>
            <main>
                <ContenedorConCarga cargando={cargando}>
                    <div className="seccion">
                        <p className="titulo-seccion con-boton">Categorías</p>
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
                                    <th>Categoría</th>
                                    <th>Descripción</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {categorias.map((categoria, i) => (
                                    <tr key={`celda-categoria-${i}`}>
                                        <td>{categoria.name}</td>
                                        <td>{categoria.description}</td>
                                        <td>
                                        <IconButton onClick={() => editar(categoria)}> <EditIcon/> </IconButton>
                                        <IconButton onClick={() => borrar(categoria.id)}> <DeleteIcon/> </IconButton>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </ContenedorConCarga>

                <ModalFormulario seccion="categoría" estado={configForm.estado} show={show} onHide={handleClose} >
                    <FormCategoria datos={configForm.datos} afterValidationAction ={configForm.accion} />
                </ModalFormulario>

                <ModalConfirmacionBorrar entidad='la categoría' show={showBorrar} onHide={handleCloseBorrar}>
                    <FormBorrar id={configBorrar.id} afterConfirmAction ={configBorrar.accion} cancelAction={handleCloseBorrar}/>
                </ModalConfirmacionBorrar>
                
            </main>
        </div>
    );
}
 
export default AdminCategorias;