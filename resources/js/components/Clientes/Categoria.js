import { useContext, useEffect } from 'react';
import { useParams } from "react-router-dom";
import CardLibro from './CardLibro';
// import ListaLibros from "./ListaLibros";

import libroContext from '../../context/libros/libroContext';

import './ListaLibros.css';
import '../../../css/app.css';

const Categoria = () => {
    const id = useParams().categoriaId;

    const LibroContext = useContext(libroContext);
    const { categoria, libros, obtenerLibrosporCategoria } = LibroContext;

    useEffect(() => {
        obtenerLibrosporCategoria(id);
        // eslint-disable-next-line
    }, [id]);

    return (
        <div className="seccion">
            <p className="titulo-seccion">Resultados para la categoría: <span>{categoria}</span></p>
            <div className='lista-grid'>
                {libros.map((libro, i) => <CardLibro key={`card-libro-categoria-${i}`} libro={libro}/>)}
            </div>
        </div>

    );
}
 
export default Categoria;