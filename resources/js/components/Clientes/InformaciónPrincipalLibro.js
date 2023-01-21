import { useState, useContext, useEffect } from 'react'
import Chip from '@mui/material/Chip';
import Rating from '@mui/material/Rating';
import Checkbox from '@mui/material/Checkbox';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import Button from 'react-bootstrap/Button';

// import OpcionesPasta from './OpcionesPasta';

// import imgplaceholder from '../../../img/imgbookplaceholder.png';
// import '../../../css/app.css';
// import './ItemLibro.css';
import './Libro.css';

import libroContext from '../../context/libros/libroContext';

const InformaciónPrincipalLibro = ({libro}) => {
    const [favorito, setFavorito] = useState(false)

    const LibroContext = useContext(libroContext);
    const { agregarListaDeseos, eliminarListaDeseos } = LibroContext;

    const userID = 2;

    const handleChangeFavorite = (e) => {
        setFavorito(e.target.checked)

        if(e.target.checked) agregarListaDeseos({user_id: userID, book_id: libro?.id});
        else eliminarListaDeseos({id: libro?.id, item_id: libro?.isFavorite, })
    }

    useEffect(() => {
       if(libro) setFavorito(libro.isFavorite !== null)
    }, [libro]);
    

    // const existencias = 19;
    const agregadoCarrito = false;

    return (
        <div className="contenedor-informacion gap">
                <div className='img-contenedor'>
                    <img 
                        src={libro && libro?.image.includes('cover') ? `http://localhost:8000/${libro?.image}` : libro?.image} 
                        alt="imagen libro" 
                    />
                </div>
                <div  className='info-contenedor'>
                    <div className='titulo-contenedor'>
                    <h1>{libro?.title}</h1>
                    <Checkbox 
                        icon={<FavoriteBorderIcon />} 
                        checkedIcon={<FavoriteIcon />}
                        checked={favorito}
                        onChange={handleChangeFavorite}
                        sx={{
                            // color: '#dc3545',
                            '&.Mui-checked': {
                            color: '#dc3545',
                            },
                        }} 
                    />
                    </div>
                    <p>por {libro?.author}</p>
                    <Rating
                        name="simple-controlled"
                        value={libro ? libro.stars : 0}
                        size="small" 
                        readOnly
                    />
                    <p className='seleccion-pasta'>Precio</p>
                    <h2 className='precio'>${libro?.price}</h2>

                    <Chip sx={{marginTop: "0.25rem"}} label={`${libro?.stock > 0 ? "Disponible" : "Agotado"}`} color={`${libro?.stock > 0 ? "primary" : "error"}`} variant="outlined" />
                    <p className='seleccion-pasta mb-2 mt-2'>Unidades disponibles: { libro?.stock }</p>
                    {/* <OpcionesPasta/> */}
                    { libro?.stock > 0 
                    ? agregadoCarrito ? <Chip label="Añadido al carrito" color="primary" variant="outlined" /> : <Button className='mt-auto' variant="primary"> Añadir al carrito</Button>
                    : null }

                </div>
            </div>
    );
}
 
export default InformaciónPrincipalLibro;