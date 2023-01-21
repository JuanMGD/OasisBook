import { useContext, useEffect } from 'react';
import banner1 from '../../../img/Banner1.png';
import CarruselImg from './CarruselImg';
import CardLibro from './CardLibro';

import './ListaLibros.css';
// import bannerimg from '../../../img/Banner1.png';
// import ListaLibros from './ListaLibros';

import libroContext from '../../context/libros/libroContext';

import '../../../css/app.css';


const Home = () => {
    const imagenesCarrusel = [banner1,banner1,banner1];

    const LibroContext = useContext(libroContext);
    const { libros, obtenerRecientes } = LibroContext;

    useEffect(() => {
        // Si hay un error
        // if (mensaje) {
        //     mostrarAlerta(mensaje.msg, mensaje.categoria);
        // }
        obtenerRecientes();
        // console.log('Se obtienen los libros más recientes');
        // eslint-disable-next-line
    }, [/* mensaje */]);

    // if (libros.length === 0) return <p>Lo sentimos, no hay libros aún</p>;

    return (
        <>
            <CarruselImg imagenes={imagenesCarrusel}/>
            <div className='seccion'>
                <div className='lista-grid'>
                    {libros.slice(0, 4).map((libro, i) => <CardLibro key={`card-libro-reciente-${i}`} libro={libro}/>)}
                    
                    {/* <img className="img-banner" src="https://links.papareact.com/dyz" alt="banner" /> */}
                    
                    {libros.slice(4, libros.length).map((libro, i) => <CardLibro key={`card-libro-reciente-${i}`} libro={libro}/>)}
                </div>
            </div>
        </>
    );
}
 
export default Home;