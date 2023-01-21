import Opiniones from './Opiniones'; 

import '../../../css/app.css';
import './Libro.css';

const InformacionExtraLibro = ({libro}) => {
    return (
        <div className="contenedor-informacion seccion">
            <h3 className='titulo-seccion'>Descripción</h3>
            <p className='descripcion w-full m-none'>{libro?.description}</p>
            <div>
                <h3 className='m-none titulo-seccion'>Categoría</h3>
                <p className='mt-3 mb-4'>{libro?.category}</p>
                <h3 className='titulo-seccion'>Editorial</h3>
                <p className='mt-3 mb-4'>{libro?.publisher}</p>
            </div>
        
            <Opiniones />
        </div>
    );
}
 
export default InformacionExtraLibro;