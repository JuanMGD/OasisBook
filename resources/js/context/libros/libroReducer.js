import { 
    INICIAR_CARGA,
    OBTENER_LIBROS,
    OBTENER_INFORMACION_LIBRO,
    OBTENER_LIBROS_CATEGORIA,
    AGREGAR_LIBRO,
    EDITAR_LIBRO,
    AGREGAR_VALORACION,
    AGREGAR_LISTA_DESEOS,
    // ELIMINAR_LISTA_DESEOS,
    ELIMINAR_LIBRO,
} from '../../types';

const libroReducer = (state, action) => {
    switch(action.type) {
        case INICIAR_CARGA:
            return {
                ...state,
                cargando: true
            }
        case OBTENER_LIBROS:
            return {
                ...state,
                libros: action.payload,
                cargando: false
            }
        case OBTENER_LIBROS_CATEGORIA:
            return {
                ...state,
                libros: action.payload.books,
                categoria: action.payload.category,
                cargando: false
            }
        case OBTENER_INFORMACION_LIBRO:
            return {
                ...state,
                libro: action.payload,
                cargando: false
            }
        case AGREGAR_LISTA_DESEOS:
            return {
                ...state,
                libro: {...state.libro, isFavorite: action.payload.id},
            }
        case AGREGAR_LIBRO:
            return {
                ...state,
                libros: [...state.libros, action.payload],
            }
        case EDITAR_LIBRO:
            return {
                ...state,
                libros: state.libros.map(libro => libro.id === action.payload.id ? action.payload : libro),
            }
        case AGREGAR_VALORACION:
            return {
                ...state,
                libros: state.libros.map(libro => {
                    if (libro.id === parseInt(action.payload.book_id))
                        return {
                            ...libro,
                            rating: {
                                id: action.payload.id, 
                                stars: action.payload.stars, 
                                comment: action.payload.comment
                            }
                        }
                        
                    else return libro;
                }),
            }
        // case AGREGAR_LISTA_DESEOS:
        //     return {
        //         ...state,
        //         libros: state.libros.map(libro => {
        //             if (libro.id === parseInt(action.payload.book_id))
        //                 return {
        //                     ...libro,
        //                     isFavorite: action.payload.id
        //                 }
                        
        //             else return libro;
        //         }),
        //     }
        // case ELIMINAR_LISTA_DESEOS:
        //     return {
        //         ...state,
        //         libros: state.libros.map(libro => {
        //             if (libro.id === parseInt(action.payload.book_id))
        //                 return {
        //                     ...libro,
        //                     isFavorite: null
        //                 }
                        
        //             else return libro;
        //         }),
        //     }
        case ELIMINAR_LIBRO:
            return {
                ...state,
                libros: state.libros.filter(libro => libro.id !== action.payload),
            }
        default: 
            return state;
    }  
}

export default libroReducer;