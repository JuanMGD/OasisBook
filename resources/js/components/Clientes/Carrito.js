import Button from '@mui/material/Button';

import SeccionCantidadProducto from './SeccionCantidadProducto';
import CardSubtotal from './CardSubtotal';
import ListItemLibro from './ListItemLibro';


const Carrito = () => {
    const datosLibroPrueba = {title: 'Diana', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro nobis animi nemo molestias pariatur tempore quos cum? Odio non excepturi autem, eius necessitatibus rem voluptate minus, ducimus saepe perferendis nam?', image:'https://via.placeholder.com/225x350.png/00ee00?text=books+est', price: 350, stock: 15, category: 'Drama', autor: 'Gabriel García Márquez', editorial_id: 1};

    return (
        <div className="seccion lista">
            <p className="titulo-seccion">Carrito</p>
            <div className='productos'>
                <ListItemLibro libro={datosLibroPrueba}>
                    <Button color="error" sx={{ textTransform: 'none'}}>Eliminar</Button> 
                    <SeccionCantidadProducto limite={10}/>
                </ListItemLibro>
                <ListItemLibro libro={datosLibroPrueba}>
                    <Button color="error" sx={{ textTransform: 'none'}}>Eliminar</Button> 
                    <SeccionCantidadProducto limite={10}/>
                </ListItemLibro>
                <ListItemLibro libro={datosLibroPrueba}>
                    <Button color="error" sx={{ textTransform: 'none'}}>Eliminar</Button> 
                    <SeccionCantidadProducto limite={10}/>
                </ListItemLibro>
                <ListItemLibro libro={datosLibroPrueba}>
                    <Button color="error" sx={{ textTransform: 'none'}}>Eliminar</Button> 
                    <SeccionCantidadProducto limite={10}/>
                </ListItemLibro>
                <ListItemLibro libro={datosLibroPrueba}>
                    <Button color="error" sx={{ textTransform: 'none'}}>Eliminar</Button> 
                    <SeccionCantidadProducto limite={10}/>
                </ListItemLibro>
                <ListItemLibro libro={datosLibroPrueba}>
                    <Button color="error" sx={{ textTransform: 'none'}}>Eliminar</Button> 
                    <SeccionCantidadProducto limite={10}/>
                </ListItemLibro>
            </div>
            <div className='total'>
                <CardSubtotal/>
            </div>
        </div>
    );
}
 
export default Carrito;