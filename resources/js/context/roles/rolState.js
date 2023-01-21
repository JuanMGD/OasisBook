import { useReducer, useContext } from 'react';

import rolContext from './rolContext';
import rolReducer from './rolReducer';

import authContext from '../autenticacion/authContext';

import { 
    INICIAR_CARGA,
    OBTENER_ROLES,
    AGREGAR_ROL,
    EDITAR_ROL,
    ELIMINAR_ROL,
} from '../../types';

import axios from 'axios';

const RolState = props => {

    const AuthContext = useContext(authContext);
    const { token } = AuthContext;

    const initialState = {
        roles: [],
        cargando: true
    }

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(rolReducer, initialState);

    const iniciarLoader = () => {
        dispatch({
            type: INICIAR_CARGA,
        });
    }

     // obtener todos los roles 
     const obtenerRoles = async () => {
        try {
            iniciarLoader();
            const resultado = await axios.get('http://localhost:8000/api/roles',
            { headers: { Authorization: `Bearer ${token}` }});
            console.log(resultado);
            dispatch({
                type: OBTENER_ROLES,
                payload: resultado.data
            });
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                rol: 'alerta-error'
            }
            // dispatch({
            //     type: PROYECTO_ERROR,
            //     payload: alerta
            // });
        }
    }

    // Agregar nuevo rol
    const agregarRol = async rol => {

        try {
            const resultado = await axios.post('http://localhost:8000/api/insertRole', 
            rol,
            { headers: { Authorization: `Bearer ${token}` }});
            console.log(resultado);
            // Insertar el proyecto en el state
            dispatch({
                type: AGREGAR_ROL,
                payload: resultado.data
            });            
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                rol: 'alerta-error'
            }
            // dispatch({
            //     type: PROYECTO_ERROR,
            //     payload: alerta
            // });
        }

    }

    // Editar rol existente
    const editarRol = async rol => {

        try {
            const resultado = await axios.post('http://localhost:8000/api/updateRole', 
            rol,
            { headers: { Authorization: `Bearer ${token}` }});
            console.log(resultado);
            // Insertar el proyecto en el state
            dispatch({
                type: EDITAR_ROL,
                payload: resultado.data
            });            
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                rol: 'alerta-error'
            }
            // dispatch({
            //     type: PROYECTO_ERROR,
            //     payload: alerta
            // });
        }

    }
    
    // Elimina un rol
    const eliminarRol = async id => {
        try {
            await axios.post('http://localhost:8000/api/deleteRole', 
            { id },
            { headers: { Authorization: `Bearer ${token}` }});
            dispatch({
                type: ELIMINAR_ROL,
                payload: id
            });
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                rol: 'alerta-error'
            }
            // dispatch({
            //     type: PROYECTO_ERROR,
            //     payload: alerta
            // });
        }
    }

    return (
        <rolContext.Provider
            value={{
                roles: state.roles,
                cargando: state.cargando,
                obtenerRoles,
                agregarRol,
                editarRol,
                eliminarRol,
            }}
        >
            {props.children}
        </rolContext.Provider>
    );
}

export default RolState;