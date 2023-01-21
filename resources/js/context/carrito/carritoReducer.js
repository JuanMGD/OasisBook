import {  
    OBTENER_LIBROS_CARRITO,
    AGREGAR_LIBRO_CARRITO,
    EDITAR_CANTIDAD_LIBRO,
    ELIMINAR_LIBRO_CARRITO,
} from '../../types';

const carritoReducer = (state, action) => {
    switch(action.type) {
        case OBTENER_LIBROS_CARRITO:
            return {
                ...state,
                carrito: action.payload
            }
        case AGREGAR_LIBRO_CARRITO:
            const carrito = localStorage.getItem('carrito') | []; 
            return localStorage.setItem('carrito', [...carrito, action.payload]); 
            // {
            //     ...state,
            //     carrito: [...state.carrito, action.payload],
            // }
        case EDITAR_CANTIDAD_LIBRO:
            localStorage.setItem('carrito', state.carrito.map(item => item.id === action.payload.id ? {...item, cantidad: action.payload.cantidad} : item)); 
            return {
                ...state,
                carrito: state.carrito.map(item => item.id === action.payload.id ? {...item, cantidad: action.payload.cantidad} : item),
            }
        case ELIMINAR_LIBRO_CARRITO:
            return {
                ...state,
                carrito: state.carrito.filter(item => item.id !== action.payload),
            }
        default: 
            return state;
    }  
}

export default carritoReducer;