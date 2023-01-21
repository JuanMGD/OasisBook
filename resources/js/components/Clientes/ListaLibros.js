import CardLibro from './CardLibro';
import bannerimg from '../../../img/Banner1.png';

import './ListaLibros.css';

const ListaLibros = () => {
    return (
        <div className='lista-grid'>
            <CardLibro/>
            <CardLibro/>
            <CardLibro/>
            <CardLibro/>
            <img className="img-banner" src="https://links.papareact.com/dyz" alt="banner" />
            <CardLibro/>
            <CardLibro/>
            <CardLibro/>
            <CardLibro/>
            <CardLibro/>
            <CardLibro/>
        </div>
    );
}
 
export default ListaLibros;