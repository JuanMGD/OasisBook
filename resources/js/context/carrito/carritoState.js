import { useReducer } from 'react';

import carritoContext from './carritoContext';
import carritoReducer from './carritoReducer';

import { 
    OBTENER_LIBROS_CARRITO,
    AGREGAR_LIBRO_CARRITO,
    EDITAR_CANTIDAD_LIBRO,
    ELIMINAR_LIBRO_CARRITO,
} from '../../types';

import axios from 'axios';

const CarritoState = props => {

    const initialState = {
        carrito: [],
    }

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(carritoReducer, initialState);

     // obtener todas laos items del carrito 
     const obtenerLibrosCarrito = async () => {
        const books = localStorage.getItem('carrito');
        try {
            const resultado = await axios.post('http://localhost:8000/api/showBookSet', {books});
            console.log(resultado);
            dispatch({
                type: OBTENER_LIBROS_CARRITO,
                payload: resultado.data
            });
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                libro: 'alerta-error'
            }
            // dispatch({
            //     type: PROYECTO_ERROR,
            //     payload: alerta
            // });
        }
    }

    // Agregar un nuevo item al carrito
    const agregarLibroCarrito = async id => {

        try {
            // const resultado = await axios.post('http://localhost:8000/api/insertCategory', libro);
            // console.log(resultado);
            // Insertar el proyecto en el state
            dispatch({
                type: AGREGAR_LIBRO_CARRITO,
                payload: id
            });            
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                libro: 'alerta-error'
            }
            // dispatch({
            //     type: PROYECTO_ERROR,
            //     payload: alerta
            // });
        }

    }

    // Editar un item existente
    const editarCantidadLibro = async libro => {

        try {
            // const resultado = await axios.post('http://localhost:8000/api/updateCategory', libro);
            // console.log(resultado);
            // Insertar el proyecto en el state
            dispatch({
                type: EDITAR_CANTIDAD_LIBRO,
                payload: {cantidad: 1, id: 1}
            });            
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                libro: 'alerta-error'
            }
            // dispatch({
            //     type: PROYECTO_ERROR,
            //     payload: alerta
            // });
        }

    }
    
    // Elimina un item del carrito
    const eliminarLibroCarrito = async id => {
        try {
            // await axios.post('http://localhost:8000/api/deleteCategory', { id });
            dispatch({
                type: ELIMINAR_LIBRO_CARRITO,
                payload: id
            });
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                libro: 'alerta-error'
            }
            // dispatch({
            //     type: PROYECTO_ERROR,
            //     payload: alerta
            // });
        }
    }

    return (
        <carritoContext.Provider
            value={{
                carrito: state.carrito,
                obtenerLibrosCarrito,
                agregarLibroCarrito,
                editarCantidadLibro,
                eliminarLibroCarrito,
            }}
        >
            {props.children}
        </carritoContext.Provider>
    );
}

export default CarritoState;