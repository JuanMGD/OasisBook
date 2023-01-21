import { useReducer, useContext } from 'react';

import autorContext from './autorContext';
import autorReducer from './autorReducer';

import authContext from '../autenticacion/authContext';

import { 
    OBTENER_AUTORES,
    AGREGAR_AUTOR,
    EDITAR_AUTOR,
    ELIMINAR_AUTOR,
    INICIAR_CARGA
} from '../../types';

import axios from 'axios';

const AutorState = props => {

    const AuthContext = useContext(authContext);
    const { token } = AuthContext;

    const initialState = {
        autores: [],
        cargando:true,
    }

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(autorReducer, initialState);

    const iniciarLoader = () => {
        dispatch({
            type: INICIAR_CARGA,
        });
    }

     // obtener todos los autores 
     const obtenerAutores = async () => {
        try {
            iniciarLoader();
            const resultado = await axios.get('http://localhost:8000/api/authors',
            { headers: { Authorization: `Bearer ${token}` }});
            console.log(resultado);
            dispatch({
                type: OBTENER_AUTORES,
                payload: resultado.data
            });
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                autor: 'alerta-error'
            }
            // dispatch({
            //     type: PROYECTO_ERROR,
            //     payload: alerta
            // });
        }
    }

    // Agregar nuevo autor
    const agregarAutor = async autor => {

        try {
            const resultado = await axios.post('http://localhost:8000/api/insertAuthor', 
            autor,
            { headers: { Authorization: `Bearer ${token}` }});
            console.log(resultado);
            // Insertar el proyecto en el state
            dispatch({
                type: AGREGAR_AUTOR,
                payload: resultado.data
            });            
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                autor: 'alerta-error'
            }
            // dispatch({
            //     type: PROYECTO_ERROR,
            //     payload: alerta
            // });
        }

    }

    // Editar autor existente
    const editarAutor = async autor => {

        try {
            const resultado = await axios.post('http://localhost:8000/api/updateAuthor', 
            autor,
            { headers: { Authorization: `Bearer ${token}` }});
            console.log(resultado);
            // Insertar el proyecto en el state
            dispatch({
                type: EDITAR_AUTOR,
                payload: resultado.data
            });            
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                autor: 'alerta-error'
            }
            // dispatch({
            //     type: PROYECTO_ERROR,
            //     payload: alerta
            // });
        }

    }
    
    // Elimina un autor
    const eliminarAutor = async id => {
        try {
            await axios.post('http://localhost:8000/api/deleteAuthor', 
            { id },
            { headers: { Authorization: `Bearer ${token}` }});
            dispatch({
                type: ELIMINAR_AUTOR,
                payload: id
            });
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                autor: 'alerta-error'
            }
            // dispatch({
            //     type: PROYECTO_ERROR,
            //     payload: alerta
            // });
        }
    }

    return (
        <autorContext.Provider
            value={{
                autores: state.autores,
                cargando: state.cargando,
                obtenerAutores,
                agregarAutor,
                editarAutor,
                eliminarAutor,
            }}
        >
            {props.children}
        </autorContext.Provider>
    );
}

export default AutorState;