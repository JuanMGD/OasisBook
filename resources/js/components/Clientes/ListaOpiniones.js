import { useContext } from 'react';
import CardOpinion from './CardOpinion';
import './Opiniones.css'

import libroContext from '../../context/libros/libroContext';

const ListaOpiniones = () => {
    
    const LibroContext = useContext(libroContext);
    const { libro } = LibroContext;

    return (
        <div className='lista-opiniones'>
            {libro?.ratings.map((rating, i) =>  rating.comment ? <CardOpinion key={`card-opinion-${i}`} rating={rating}/> : null)}
        </div>
    );
}
 
export default ListaOpiniones;