import {  
    INICIAR_CARGA,
    OBTENER_USUARIOS,
    AGREGAR_USUARIO,
    EDITAR_USUARIO,
    ELIMINAR_USUARIO,
} from '../../types';

const usuarioReducer = (state, action) => {
    switch(action.type) {
        case INICIAR_CARGA:
            return {
                ...state,
                cargando: true
            }
        case OBTENER_USUARIOS:
            return {
                ...state,
                usuarios: action.payload,
                cargando: false
            }
        case AGREGAR_USUARIO:
            return {
                ...state,
                usuarios: [...state.usuarios, action.payload],
            }
        case EDITAR_USUARIO:
            return {
                ...state,
                usuarios: state.usuarios.map(usuario => usuario.id === action.payload.id ? action.payload : usuario),
            }
        case ELIMINAR_USUARIO:
            return {
                ...state,
                usuarios: state.usuarios.filter(usuario => usuario.id !== action.payload),
            }
        default: 
            return state;
    }  
}

export default usuarioReducer;