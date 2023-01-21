import { useReducer, useContext } from 'react';

import categoriaContext from './categoriaContext';
import categoriaReducer from './categoriaReducer';

import authContext from '../autenticacion/authContext';

import { 
    INICIAR_CARGA,
    OBTENER_CATEGORIAS,
    AGREGAR_CATEGORIA,
    EDITAR_CATEGORIA,
    ELIMINAR_CATEGORIA,
} from '../../types';

import axios from 'axios';

const CategoriaState = props => {

    const AuthContext = useContext(authContext);
    const { token } = AuthContext;

    const initialState = {
        categorias: [],
        cargando: true,
    }

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(categoriaReducer, initialState);

    const iniciarLoader = () => {
        dispatch({
            type: INICIAR_CARGA,
        });
    }

    // obtener todas las categorías 
    const obtenerCategorias = async () => {
        try {
            iniciarLoader();
            const resultado = await axios.get('http://localhost:8000/api/categories',
            { headers: { Authorization: `Bearer ${token}` }});
            console.log(resultado);
            dispatch({
                type: OBTENER_CATEGORIAS,
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

    // Agregar nueva categoría
    const agregarCategoria = async categoria => {

        try {
            const resultado = await axios.post('http://localhost:8000/api/insertCategory', 
            categoria,
            { headers: { Authorization: `Bearer ${token}` }});
            console.log(resultado);
            // Insertar el proyecto en el state
            dispatch({
                type: AGREGAR_CATEGORIA,
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

    // Editar categoría existente
    const editarCategoria = async categoria => {

        try {
            const resultado = await axios.post('http://localhost:8000/api/updateCategory', 
            categoria,
            { headers: { Authorization: `Bearer ${token}` }});
            console.log(resultado);
            // Insertar el proyecto en el state
            dispatch({
                type: EDITAR_CATEGORIA,
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
    
    // Elimina una categoría
    const eliminarCategoria = async id => {
        try {
            await axios.post('http://localhost:8000/api/deleteCategory', 
            { id },
            { headers: { Authorization: `Bearer ${token}` }});
            dispatch({
                type: ELIMINAR_CATEGORIA,
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
        <categoriaContext.Provider
            value={{
                categorias: state.categorias,
                cargando: state.cargando,
                obtenerCategorias,
                agregarCategoria,
                editarCategoria,
                eliminarCategoria,
            }}
        >
            {props.children}
        </categoriaContext.Provider>
    );
}

export default CategoriaState;