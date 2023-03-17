import { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

import clienteAxios from '../../config/axios';
import axios from 'axios';

import {
    REGISTRO_EXISTOSO,
    REGISTRO_ERROR,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION,
    OBTENER_USUARIO,
} from '../../types';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        nombre: null,
        rol: null,
        error: null,
        msjError: null,
        // mensaje: null,
        cargando: true
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const usuarioAutenticado = async () => {
        try {
            // const respuesta = await axios.post('http://localhost:8000/api/getUserByToken', { headers: { Authorization: `Bearer ${state.token}` }});
            const resultado = await axios.post('http://localhost:8000/api/getUserByToken', {},
            { headers: { Authorization: `Bearer ${state.token}` }});
            console.log(resultado);
            dispatch({
                type: OBTENER_USUARIO,
                payload: resultado.data
            });
        } catch (error) {
            console.log(error);
        }
    }

    const registrarUsuario = async datos => {
        try {
            const respuesta = await axios.post('http://localhost:8000/api/register', datos);

            dispatch({
                type: REGISTRO_EXISTOSO,
                payload: respuesta.data
            });

            // Obtener el usuario
            // usuarioAutenticado();
        } catch (error) {
            // console.log(error.response.data.msg);
            // const alerta = {
            //     msg: error.response.data.msg,
            //     categoria: 'alerta-error'
            // }

            dispatch({
                type: REGISTRO_ERROR,
                payload: 'Ocurrió un fallo al realizar el registro'
            });
        }
    }
    
    // Retorna el usuario autenticado
    // const usuarioAutenticado = async () => {
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         tokenAuth(token);
    //     }

    //     try {
    //         const respuesta = await clienteAxios.get('/api/auth');
    //         dispatch({
    //             type: OBTENER_USUARIO,
    //             payload: respuesta.data.usuario
    //         });
    //     } catch (error) {
    //         console.log(error.response);
    //         dispatch({
    //             type: LOGIN_ERROR
    //         });
    //     }
    // }

    // Cuando el usuario inicia sesion
    const iniciarSesion = async datos => {
        try {
            const respuesta = await axios.post('http://localhost:8000/api/login', datos);
            console.log(respuesta);
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            });
            
            // Obtener el usuario
            // usuarioAutenticado();
        } catch (error) {
            // console.log(error.response.data.msg);
            console.log(error);
            // const alerta = {
            //     msg: 'Correo y/o contraseña incorrectos',
            //     categoria: 'alerta-error'
            // }

            dispatch({
                type: LOGIN_ERROR,
                payload: 'Correo y/o contraseña incorrectos'
            });
        }
    }

    // Cierra la sesión del usuario
    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        });
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                nombre: state.nombre,
                rol: state.rol,
                error: state.error,
                msjError: state.msjError,
                // mensaje: state.mensaje,
                cargando: state.cargando,
                // tokenAuth,
                usuarioAutenticado,
                registrarUsuario,
                iniciarSesion,
                cerrarSesion
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;