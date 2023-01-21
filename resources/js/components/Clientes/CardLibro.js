import Button from 'react-bootstrap/Button';
import Rating from '@mui/material/Rating';
import Chip from '@mui/material/Chip';
// import Typography from '@mui/material/Typography';
// import Card from 'react-bootstrap/Card';
// import { BsCartPlus } from "react-icons/bs";

import { useNavigate } from "react-router-dom";

import imgplaceholder from '../../../img/imgbookplaceholder.png';
import './ItemLibro.css';

const CardLibro = ({ libro }) => {
    // const existencias = 19;
    const agregadoCarrito = false;

    // const [value, setValue] = React.useState(2);
    const navigate = useNavigate();

    return (
        <div className='item-libro card link' onClick={(e) => !e.target.className.includes('btn') ? navigate(`/libros/${libro.id}`) : null}>
            <p className='categoria'>{ libro.category }</p>
            <img src={libro?.image?.includes('cover') ? `http://localhost:8000/${libro.image}` : libro.image} className='imagen'/>

            <h4 className='title'>{ libro.title }</h4>
            <p className="autor">por <span>{libro.author}</span></p>

            <div className='flex'>
                {/* {Array(5).fill().map((_, i) => (
                    <StarIcon key={i} className='h-5 text-yellow-500' />
                ))} */}
            </div>
            <Rating
                name="simple-controlled"
                value={libro.stars}
                size="small" 
                readOnly
            />

            <p className='descripcion'>{libro.description}</p>

            <div className='precio'>
                <span>${libro.price}</span>
            </div>

            {/* <div className='delivery'>
                <img src="https://links.papareact.com/fdw" alt="" />
                <p className='text-xs text-gray-500'>Envío gratuito</p>
            </div> */}

            {/* Para verificar si está en el carrito se puede hacer uso de un Set */}
            { libro.stock > 0 
            ? agregadoCarrito ? <Chip label="Añadido" color="primary" variant="outlined" /> : <Button className='mt-auto' variant="primary"> Añadir al carrito</Button> 
            : <Chip label="Agotado" color="error" variant="outlined" /> }
            {/* { agregadoCarrito ? <Chip label="Añadido" color="primary" variant="outlined" /> : <Button className='mt-auto' variant="primary"> Añadir al carrito</Button> } */}
            {/* <Button className='mt-auto' variant="primary"> Quitar del carrito</Button> */}
        </div>
    );
}
 
export default CardLibro;