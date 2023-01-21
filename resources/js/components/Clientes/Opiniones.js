import { useContext } from 'react';
import DesgloceValoraciones from './DesgloceValoraciones';
import ListaOpiniones from './ListaOpiniones';
import './Opiniones.css'

import libroContext from '../../context/libros/libroContext';

const Opiniones = () => {
    const LibroContext = useContext(libroContext);
    const { libro } = LibroContext;
    
    if (libro && libro.ratings.length === 0) return <h3 className='titulo-seccion mb-3'>Sin valoraciones aún</h3> 

    return (
        <div className='contenedor-opiniones'>
            <h3 className='titulo-seccion'>Opiniones del libro</h3>
            <DesgloceValoraciones/>
            <ListaOpiniones/>
        </div>
    );
}
 
export default Opiniones;