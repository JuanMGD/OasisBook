// import Button from 'react-bootstrap/Button';
// import Rating from '@mui/material/Rating';
import imgplaceholder from '../../../img/imgbookplaceholder.png';
import './ItemLibro.css';

const ListItemLibro = ({libro, children}) => {
    return (
        <div className='card horizontal'>
            <div className='img-contenedor'>
                <p className='categoria'>{ libro.category }</p>
                <img src={libro.image.includes('cover') ? `http://localhost:8000/${libro.image}` : libro.image} className='imagen'/>
            </div>

            <div className='info-contenedor'>
                <h4 className='title'>{ libro.title }</h4>
                <p className="autor">por <span>{libro.author}</span></p>


                <p className='descripcion'>{libro.description}</p>

                <div className='precio'>
                    <span>${libro.price}</span>
                </div>

                <div className='acciones gap'>
                    {children}
                </div>

                {/* <div className='delivery'>
                    <img src="https://links.papareact.com/fdw" alt="" />
                    <p className='text-xs text-gray-500'>Envío gratuito</p>
                </div> */}

                {/* <Button className='mt-auto' variant="primary"> Añadir al carrito</Button> */}
                {/* <Button className='mt-auto' variant="primary"> Quitar del carrito</Button> */}
            </div>

        </div>
    );
}
 
export default ListItemLibro;