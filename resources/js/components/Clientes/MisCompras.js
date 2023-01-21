import { useContext, useEffect } from 'react';
import BsButton from 'react-bootstrap/Button';
import Button from '@mui/material/Button';
import ListItemLibro from './ListItemLibro';

import ModalFormulario from '../Admin/ModalFormulario';
import FormValoracion from './FormValoracion';

import { useNavigate } from "react-router-dom";

import useModal from '../hooks/useModal';
import useConfigFormulario from '../hooks/useConfigFormulario';

import libroContext from '../../context/libros/libroContext';

const MisCompras = () => {

    const LibroContext = useContext(libroContext);
    const { libros, obtenerComprasLibro, agregarValoracionLibro, editarValoracionLibro } = LibroContext;

    const userID = 2;

    useEffect(() => {
        obtenerComprasLibro(userID);
        // eslint-disable-next-line
    }, []);

    const fnAgregar = (datos) => {
        agregarValoracionLibro(datos)
        handleClose()
    }
    
    const fnEditar = (datos) => {
        editarValoracionLibro(datos)
        handleClose()
    }

    // const valoracion = null;
    // const valoracion = {calificacion: 4, comentario: 'Me gustó mucho el libro'};
    
    const [show, handleClose, handleShow] = useModal();

    const [configForm, agregar, editar] = useConfigFormulario({
        mostrar: handleShow,
        fnAgregar, 
        fnEditar
    },
    ['Valora el libro', 'Editar valoración']
    );

    const navigate = useNavigate();

    // const datosLibroPrueba = {title: 'Diana', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro nobis animi nemo molestias pariatur tempore quos cum? Odio non excepturi autem, eius necessitatibus rem voluptate minus, ducimus saepe perferendis nam?', image:'https://via.placeholder.com/225x350.png/00ee00?text=books+est', price: 350, stock: 15, category: 'Drama', autor: 'Gabriel García Márquez', editorial_id: 1};

    return (
        <div className="seccion lista">
            <p className="titulo-seccion">Mis compras</p>
            {libros.map((libro, i) => (
                <ListItemLibro key={`card-libro-compras-${i}`} libro={libro}>
                    <Button sx={{ textTransform: 'none'}} onClick={() => navigate(`/libros/${libro.id}`)}>Volver a comprar</Button>
                    <BsButton className='mt-auto outline-none' variant="primary" onClick={() => libro.rating ? editar(libro.rating) : agregar({user_id: userID, book_id: libro.id, stars: 1, comment: '',})}> Valorar</BsButton>
                </ListItemLibro>
            ))}
            {/* <ListItemLibro libro={datosLibroPrueba}>
                <Button sx={{ textTransform: 'none'}} onClick={() => navigate("/libros/123")}>Volver a comprar</Button>
                <BsButton className='mt-auto outline-none' variant="primary" onClick={() => valoracion ? editar(valoracion) : agregar()}> Valorar</BsButton>
            </ListItemLibro> */}
            
            <ModalFormulario estado={configForm.estado} show={show} onHide={handleClose} >
                <FormValoracion datos={configForm.datos} afterSubmitAction ={configForm.accion} />
            </ModalFormulario>
        </div>
    );
}
 
export default MisCompras;