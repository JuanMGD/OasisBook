import {  
    INICIAR_CARGA,
    OBTENER_EDITORIALES,
    AGREGAR_EDITORIAL,
    EDITAR_EDITORIAL,
    ELIMINAR_EDITORIAL,
} from '../../types';

const editorialReducer = (state, action) => {
    switch(action.type) {
        case INICIAR_CARGA:
            return {
                ...state,
                cargando: true
            }
        case OBTENER_EDITORIALES:
            return {
                ...state,
                editoriales: action.payload,
                cargando: false
            }
        case AGREGAR_EDITORIAL:
            return {
                ...state,
                editoriales: [...state.editoriales, action.payload],
            }
        case EDITAR_EDITORIAL:
            return {
                ...state,
                editoriales: state.editoriales.map(editorial => editorial.id === action.payload.id ? action.payload : editorial),
            }
        case ELIMINAR_EDITORIAL:
            return {
                ...state,
                editoriales: state.editoriales.filter(editorial => editorial.id !== action.payload),
            }
        default: 
            return state;
    }  
}

export default editorialReducer;