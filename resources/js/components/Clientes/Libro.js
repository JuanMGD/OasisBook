import { useContext, useEffect } from 'react';
import { useParams } from "react-router-dom";
// import CardLibro from './CardLibro';
// import ListaLibros from "./ListaLibros";
// import Rating from '@mui/material/Rating';
// import Checkbox from '@mui/material/Checkbox';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

// import Button from 'react-bootstrap/Button';

import InformaciónPrincipalLibro from './InformaciónPrincipalLibro';
import InformacionExtraLibro from "./InformacionExtraLibro";
// import OpcionesPasta from './OpcionesPasta';

import libroContext from '../../context/libros/libroContext';

// import imgplaceholder from '../../../img/imgbookplaceholder.png';
import '../../../css/app.css';
import './Libro.css';
import './ItemLibro.css';

const Libro = () => {
    const id = useParams().libroId;

    const LibroContext = useContext(libroContext);
    const { libro, obtenerInformacionLibro } = LibroContext;

    const userID = 2;

    useEffect(() => {
        obtenerInformacionLibro(id, userID);
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <InformaciónPrincipalLibro libro={libro}/>        
            <InformacionExtraLibro libro={libro}/>        
        </>

    );
}
 
export default Libro;