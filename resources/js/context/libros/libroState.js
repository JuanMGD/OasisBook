import { useReducer, useContext } from 'react';

import libroContext from './libroContext';
import libroReducer from './libroReducer';

import authContext from '../autenticacion/authContext';

import {
    INICIAR_CARGA, 
    OBTENER_LIBROS,
    OBTENER_INFORMACION_LIBRO,
    AGREGAR_LISTA_DESEOS,
    OBTENER_LIBROS_CATEGORIA,
    AGREGAR_LIBRO,
    EDITAR_LIBRO,
    ELIMINAR_LIBRO,
    AGREGAR_VALORACION,
} from '../../types';

import clienteAxios from '../../config/axios';
import axios from 'axios';

const LibroState = props => {

    const AuthContext = useContext(authContext);
    const { token } = AuthContext;

    const initialState = {
        libros: [],
        categoria: null,
        libro: null,
        cargando: true,
    }

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(libroReducer, initialState);


    const iniciarLoader = () => {
        dispatch({
            type: INICIAR_CARGA,
        });
    }


    // obtener los 10 libros más recientes
    const obtenerRecientes = async () => {
        try {
            iniciarLoader();
            const resultado = await axios.get('http://localhost:8000/api/showLatestBooks',
            { headers: { Authorization: `Bearer ${token}` }});
            console.log(resultado);
            dispatch({
                type: OBTENER_LIBROS,
                payload: resultado.data
            });
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            // dispatch({
            //     type: PROYECTO_ERROR,
            //     payload: alerta
            // });
        }
    }

     // obtener todos los libros 
     const obtenerLibros = async () => {
        try {
            iniciarLoader();
            const resultado = await axios.get('http://localhost:8000/api/books',
            { headers: { Authorization: `Bearer ${token}` }});
            console.log(resultado);
            dispatch({
                type: OBTENER_LIBROS,
                payload: resultado.data
            });
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            // dispatch({
            //     type: PROYECTO_ERROR,
            //     payload: alerta
            // });
        }
    }

     // obtener libros por su categoría
     const obtenerLibrosporCategoria = async (id) => {
        try {
            iniciarLoader();
            const resultado = await axios.post('http://localhost:8000/api/showBooksByCategory', 
            {0: id},
            { headers: { Authorization: `Bearer ${token}` }})
            console.log(resultado);
            dispatch({
                type: OBTENER_LIBROS_CATEGORIA,
                payload: resultado.data
            });
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            // dispatch({
            //     type: PROYECTO_ERROR,
            //     payload: alerta
            // });
        }
    }

    // obtener información de un libro en específico
    const obtenerInformacionLibro = async (id, user_id=null) => {
        try {
            iniciarLoader();
            const resultado = await axios.post('http://localhost:8000/api/showBook', 
            {id},
            { headers: { Authorization: `Bearer ${token}` }})
            console.log(resultado);
            dispatch({
                type: OBTENER_INFORMACION_LIBRO,
                payload: resultado.data
            });
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            // dispatch({
            //     type: PROYECTO_ERROR,
            //     payload: alerta
            // });
        }
    }

    // Obtener los libros que un usuario ha comprado
    const obtenerComprasLibro = async (user_id=2) => {
        try {
            iniciarLoader();
            const resultado = await axios.post('http://localhost:8000/api/showUserPurchases', 
            // {user_id},
            { headers: { 'Content-Type': 'multipart/form-data',
            'Accept': 'application/json', Authorization: `Bearer ${token}` }})
            console.log(resultado);
            dispatch({
                type: OBTENER_LIBROS,
                payload: resultado.data
            });
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            // dispatch({
            //     type: PROYECTO_ERROR,
            //     payload: alerta
            // });
        }
    }

    // Obtener los libros que un usuario ha marcado como favoritos
    const obtenerListaDeseos = async (user_id=2) => {
        try {
            iniciarLoader();
            const resultado = await axios.post('http://localhost:8000/api/wishlist', 
            // {user_id},
            { headers: { Authorization: `Bearer ${token}` }})
            console.log(resultado);
            dispatch({
                type: OBTENER_LIBROS,
                payload: resultado.data
            });
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            // dispatch({
            //     type: PROYECTO_ERROR,
            //     payload: alerta
            // });
        }
    }

    // Obtener los libros que un usuario ha marcado como favoritos
    const obtenerVentas = async () => {
        try {
            iniciarLoader();
            const resultado = await axios.get('http://localhost:8000/api/sales',
            { headers: { Authorization: `Bearer ${token}` }})
            console.log(resultado);
            dispatch({
                type: OBTENER_LIBROS,
                payload: resultado.data
            });
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            // dispatch({
            //     type: PROYECTO_ERROR,
            //     payload: alerta
            // });
        }
    }

    // Agregar nuevo libro a favoritos
    const agregarListaDeseos = async libro => {
        try {
            const resultado = await axios.post('http://localhost:8000/api/insertWishlistItem', 
            libro,
            { headers: { Authorization: `Bearer ${token}` }});
            console.log(resultado);
            // Insertar el proyecto en el state
            dispatch({
                type: AGREGAR_LISTA_DESEOS,
                payload: resultado.data
            });            
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            // dispatch({
            //     type: PROYECTO_ERROR,
            //     payload: alerta
            // });
        }

    }

    // Eliminar nuevo libro de favoritos
    const eliminarListaDeseos = async libro => {

        try {
            await axios.post('http://localhost:8000/api/deleteWishlistItem', 
            {id: libro.item_id},
            { headers: { Authorization: `Bearer ${token}` }});
            // console.log(resultado);
            // Insertar el proyecto en el state
            dispatch({
                type: ELIMINAR_LIBRO,
                payload: libro.id
            });            
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            // dispatch({
            //     type: PROYECTO_ERROR,
            //     payload: alerta
            // });
        }

    }

    // Agregar nuevo libro
    const agregarLibro = async libro => {

        try {
            const resultado = await axios.post('http://localhost:8000/api/insertBook', 
            libro,
            { headers: { Authorization: `Bearer ${token}` }});
            console.log(resultado);
            // Insertar el proyecto en el state
            dispatch({
                type: AGREGAR_LIBRO,
                payload: resultado.data
            });            
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            // dispatch({
            //     type: PROYECTO_ERROR,
            //     payload: alerta
            // });
        }

    }

    // Editar libro existente
    const editarLibro = async libro => {

        try {
            const resultado = await axios.post('http://localhost:8000/api/updateBook', 
            libro,
            { headers: { Authorization: `Bearer ${token}` }});
            console.log(resultado);
            // Insertar el proyecto en el state
            dispatch({
                type: EDITAR_LIBRO,
                payload: resultado.data
            });            
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            // dispatch({
            //     type: PROYECTO_ERROR,
            //     payload: alerta
            // });
        }

    }

    const agregarValoracionLibro = async valoracion => {

        try {
            const resultado = await axios.post('http://localhost:8000/api/insertRating', 
            valoracion,
            { headers: { Authorization: `Bearer ${token}` }});
            console.log(resultado);
            // Insertar el proyecto en el state
            dispatch({
                type: AGREGAR_VALORACION,
                payload: resultado.data
            });            
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            // dispatch({
            //     type: PROYECTO_ERROR,
            //     payload: alerta
            // });
        }

    }

    // Editar valoración existente
    const editarValoracionLibro = async valoracion => {

        try {
            const resultado = await axios.post('http://localhost:8000/api/updateRating', 
            valoracion,
            { headers: { Authorization: `Bearer ${token}` }});
            console.log(resultado);
            // Insertar el proyecto en el state
            dispatch({
                type: AGREGAR_VALORACION,
                payload: resultado.data
            });            
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            // dispatch({
            //     type: PROYECTO_ERROR,
            //     payload: alerta
            // });
        }

    }
    
    // Elimina un libro
    const eliminarLibro = async id => {
        try {
            await axios.post('http://localhost:8000/api/deleteBook', 
            { id },
            { headers: { Authorization: `Bearer ${token}` }});
            dispatch({
                type: ELIMINAR_LIBRO,
                payload: id
            });
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            // dispatch({
            //     type: PROYECTO_ERROR,
            //     payload: alerta
            // });
        }
    }

    return (
        <libroContext.Provider
            value={{
                libros: state.libros,
                categoria: state.categoria,
                libro: state.libro,
                cargando: state.cargando,
                obtenerLibros,
                obtenerRecientes,
                obtenerLibrosporCategoria,
                obtenerInformacionLibro,
                obtenerComprasLibro,
                obtenerVentas,
                obtenerListaDeseos,
                agregarListaDeseos,
                eliminarListaDeseos,
                agregarLibro,
                editarLibro,
                eliminarLibro,
                agregarValoracionLibro,
                editarValoracionLibro
            }}
        >
            {props.children}
        </libroContext.Provider>
    );
}

export default LibroState;