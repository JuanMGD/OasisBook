import {  
    INICIAR_CARGA,
    OBTENER_ROLES,
    AGREGAR_ROL,
    EDITAR_ROL,
    ELIMINAR_ROL,
} from '../../types';

const rolReducer = (state, action) => {
    switch(action.type) {
        case INICIAR_CARGA:
            return {
                ...state,
                cargando: true
            }
        case OBTENER_ROLES:
            return {
                ...state,
                roles: action.payload,
                cargando: false
            }
        case AGREGAR_ROL:
            return {
                ...state,
                roles: [...state.roles, action.payload],
            }
        case EDITAR_ROL:
            return {
                ...state,
                roles: state.roles.map(rol => rol.id === action.payload.id ? action.payload : rol),
            }
        case ELIMINAR_ROL:
            return {
                ...state,
                roles: state.roles.filter(rol => rol.id !== action.payload),
            }
        default: 
            return state;
    }  
}

export default rolReducer;