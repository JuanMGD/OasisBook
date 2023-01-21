import {  
    OBTENER_AUTORES,
    AGREGAR_AUTOR,
    EDITAR_AUTOR,
    ELIMINAR_AUTOR,
    INICIAR_CARGA
} from '../../types';

const autorReducer = (state, action) => {
    switch(action.type) {
        case INICIAR_CARGA:
            return {
                ...state,
                cargando: true
            }
        case OBTENER_AUTORES:
            return {
                ...state,
                autores: action.payload,
                cargando: false
            }
        case AGREGAR_AUTOR:
            return {
                ...state,
                autores: [...state.autores, action.payload],
            }
        case EDITAR_AUTOR:
            return {
                ...state,
                autores: state.autores.map(autor => autor.id === action.payload.id ? action.payload : autor),
            }
        case ELIMINAR_AUTOR:
            return {
                ...state,
                autores: state.autores.filter(autor => autor.id !== action.payload),
            }
        default: 
            return state;
    }  
}

export default autorReducer;