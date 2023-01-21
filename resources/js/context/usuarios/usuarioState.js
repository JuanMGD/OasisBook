import { useReducer, useContext } from 'react';

import usuarioContext from './usuarioContext';
import usuarioReducer from './usuarioReducer';

import authContext from '../autenticacion/authContext';

import { 
    INICIAR_CARGA,
    OBTENER_USUARIOS,
    AGREGAR_USUARIO,
    EDITAR_USUARIO,
    ELIMINAR_USUARIO,
} from '../../types';

import axios from 'axios';

const UsuarioState = props => {

    const AuthContext = useContext(authContext);
    const { token } = AuthContext;

    const initialState = {
        usuarios: [],
        cargando: true
    }

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(usuarioReducer, initialState);

    const iniciarLoader = () => {
        dispatch({
            type: INICIAR_CARGA,
        });
    }

     // obtener todos los usuarios 
     const obtenerUsuarios = async () => {
        try {
            iniciarLoader();
            const resultado = await axios.get('http://localhost:8000/api/users',
            { headers: { Authorization: `Bearer ${token}` }});
            console.log(resultado);
            dispatch({
                type: OBTENER_USUARIOS,
                payload: resultado.data
            });
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                usuario: 'alerta-error'
            }
            // dispatch({
            //     type: PROYECTO_ERROR,
            //     payload: alerta
            // });
        }
    }

    // Agregar nueva categoría
    const agregarUsuario = async usuario => {

        try {
            const resultado = await axios.post('http://localhost:8000/api/insertUser', 
            usuario,
            { headers: { Authorization: `Bearer ${token}` }});
            console.log(resultado);
            // Insertar el proyecto en el state
            dispatch({
                type: AGREGAR_USUARIO,
                payload: resultado.data
            });            
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                usuario: 'alerta-error'
            }
            // dispatch({
            //     type: PROYECTO_ERROR,
            //     payload: alerta
            // });
        }

    }

    // Editar categoría existente
    const editarUsuario = async usuario => {

        try {
            const resultado = await axios.post('http://localhost:8000/api/updateUser', 
            usuario,
            { headers: { Authorization: `Bearer ${token}` }});
            console.log(resultado);
            // Insertar el proyecto en el state
            dispatch({
                type: EDITAR_USUARIO,
                payload: resultado.data
            });            
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                usuario: 'alerta-error'
            }
            // dispatch({
            //     type: PROYECTO_ERROR,
            //     payload: alerta
            // });
        }

    }
    
    // Elimina una categoría
    const eliminarUsuario = async id => {
        try {
            await axios.post('http://localhost:8000/api/deleteUser', 
            { id },
            { headers: { Authorization: `Bearer ${token}` }});
            dispatch({
                type: ELIMINAR_USUARIO,
                payload: id
            });
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                usuario: 'alerta-error'
            }
            // dispatch({
            //     type: PROYECTO_ERROR,
            //     payload: alerta
            // });
        }
    }

    return (
        <usuarioContext.Provider
            value={{
                usuarios: state.usuarios,
                cargando: state.cargando,
                obtenerUsuarios,
                agregarUsuario,
                editarUsuario,
                eliminarUsuario,
            }}
        >
            {props.children}
        </usuarioContext.Provider>
    );
}

export default UsuarioState;