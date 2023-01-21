import {
    INICIAR_CARGA,  
    OBTENER_CATEGORIAS,
    AGREGAR_CATEGORIA,
    EDITAR_CATEGORIA,
    ELIMINAR_CATEGORIA,
} from '../../types';

const categoriaReducer = (state, action) => {
    switch(action.type) {
        case INICIAR_CARGA:
            return {
                ...state,
                cargando: true
            }
        case OBTENER_CATEGORIAS:
            return {
                ...state,
                categorias: action.payload,
                cargando: false
            }
        case AGREGAR_CATEGORIA:
            return {
                ...state,
                categorias: [...state.categorias, action.payload],
            }
        case EDITAR_CATEGORIA:
            return {
                ...state,
                categorias: state.categorias.map(categoria => categoria.id === action.payload.id ? action.payload : categoria),
            }
        case ELIMINAR_CATEGORIA:
            return {
                ...state,
                categorias: state.categorias.filter(categoria => categoria.id !== action.payload),
            }
        default: 
            return state;
    }  
}

export default categoriaReducer;