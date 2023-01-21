import { useContext, useEffect } from 'react';
import BsButton from 'react-bootstrap/Button';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import ListItemLibro from './ListItemLibro';

import libroContext from '../../context/libros/libroContext';

const WishList = () => {
    // const existencias = 19;
    // const datosLibroPrueba = {title: 'Diana', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro nobis animi nemo molestias pariatur tempore quos cum? Odio non excepturi autem, eius necessitatibus rem voluptate minus, ducimus saepe perferendis nam?', image:'https://via.placeholder.com/225x350.png/00ee00?text=books+est', price: 350, stock: 15, category: 'Drama', autor: 'Gabriel García Márquez', editorial_id: 1};

    const LibroContext = useContext(libroContext);
    const { libros, obtenerListaDeseos, eliminarListaDeseos } = LibroContext;

    const userID = 2;

    useEffect(() => {
        obtenerListaDeseos(userID);
        // eslint-disable-next-line
    }, []);

    return (
        <div className="seccion lista">
            <p className="titulo-seccion">Lista de deseos</p>
            {libros.map((libro, i) => (
                <ListItemLibro key={`card-wishlist-${i}`} libro={libro}>
                    <Button color="error" onClick={() => eliminarListaDeseos(libro)}  sx={{ textTransform: 'none'}}>Eliminar</Button>
                    { libro.stock > 0 ? <BsButton className='mt-auto outline-none' variant="primary"> Añadir al carrito</BsButton> : <Chip label="Agotado" color="error" variant="outlined" /> }
                </ListItemLibro>
            ))}
            {/* <ListItemLibro libro={datosLibroPrueba}>
                <Button color="error" sx={{ textTransform: 'none'}}>Eliminar</Button>
                { existencias > 0 ? <BsButton className='mt-auto outline-none' variant="primary"> Añadir al carrito</BsButton> : <Chip label="Agotado" color="error" variant="outlined" /> }
            </ListItemLibro> */}
        </div>
    );
}
 
export default WishList;