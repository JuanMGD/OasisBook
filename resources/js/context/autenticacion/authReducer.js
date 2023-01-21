import {
    REGISTRO_EXISTOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case REGISTRO_EXISTOSO:
        case LOGIN_EXITOSO:
            localStorage.setItem('token', action.payload.token);
            // localStorage.setItem('nombre', action.payload.name);
            // localStorage.setItem('rol', action.payload.role);
            return {
                ...state,
                token: action.payload.token,
                nombre: action.payload.name,
                rol: action.payload.role,
                autenticado: true,
                error: null,
                msjError: null,
                cargando: false
            }
        case OBTENER_USUARIO:
            return {
                ...state,
                autenticado: true,
                nombre: action.payload.name,
                rol: action.payload.role,
                cargando: false
            }
        case LOGIN_ERROR:
        case REGISTRO_ERROR:
            // localStorage.removeItem('token');
            return {
                ...state,
                error: true,
                msjError: action.payload,
            }
        case CERRAR_SESION:
            localStorage.removeItem('token');
            // localStorage.removeItem('nombre');
            // localStorage.removeItem('rol');
            return {
                ...state,
                token: null,
            }
        default:
            return state;
    }
}