import { useContext } from 'react';
import Rating from '@mui/material/Rating';
import BarraProgreso from './BarraProgreso';
import './Opiniones.css'

import libroContext from '../../context/libros/libroContext';

const DesgloceValoraciones = () => {
    const LibroContext = useContext(libroContext);
    const { libro } = LibroContext;

    let cantidadValoraciones = {
        "5": 0,
        "4": 0,
        "3": 0,
        "2": 0,
        "1": 0,
        "0": 0,
    }

    libro?.ratings.map(({stars}) => cantidadValoraciones[stars]++);

    return (
        <div className='card-valoraciones'>
            <div>
                <div className='wrapper'>
                    <h4 className='valoracion'>{libro?.stars.toFixed(1)}</h4>
                    <div>
                        <Rating
                            name="simple-controlled"
                            value={libro ? libro.stars : 0}
                            readOnly
                        />
                        <p className='cantidad-valoraciones'>{libro?.ratings.length} calificaciones</p>
                    </div>
                    {Object.keys(cantidadValoraciones).reverse().map((valoracion) => (
                        <BarraProgreso key={`barra-estrella-${valoracion}`} estrellas={valoracion} progreso={(cantidadValoraciones[valoracion] / libro?.ratings.length) * 100}/>
                    ))}
                </div>
            </div>
        </div>
    );
}
 
export default DesgloceValoraciones;