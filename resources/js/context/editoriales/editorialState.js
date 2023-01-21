import { useReducer, useContext } from 'react';

import editorialContext from './editorialContext';
import editorialReducer from './editorialReducer';

import authContext from '../autenticacion/authContext';

import { 
    INICIAR_CARGA,
    OBTENER_EDITORIALES,
    AGREGAR_EDITORIAL,
    EDITAR_EDITORIAL,
    ELIMINAR_EDITORIAL,
} from '../../types';

import axios from 'axios';

const EditorialState = props => {

    const AuthContext = useContext(authContext);
    const { token } = AuthContext;

    const initialState = {
        editoriales: [],
        cargando: true
    }

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(editorialReducer, initialState);

    const iniciarLoader = () => {
        dispatch({
            type: INICIAR_CARGA,
        });
    }

     // obtener todas las editoriales 
     const obtenerEditoriales = async () => {
        try {
            iniciarLoader();
            const resultado = await axios.get('http://localhost:8000/api/publishers',
            { headers: { Authorization: `Bearer ${token}` }});
            console.log(resultado);
            dispatch({
                type: OBTENER_EDITORIALES,
                payload: resultado.data
            });
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                editorial: 'alerta-error'
            }
            // dispatch({
            //     type: PROYECTO_ERROR,
            //     payload: alerta
            // });
        }
    }

    // Agregar nueva editorial
    const agregarEditorial = async editorial => {

        try {
            const resultado = await axios.post('http://localhost:8000/api/insertPublisher', 
            editorial,
            { headers: { Authorization: `Bearer ${token}` }});
            console.log(resultado);
            // Insertar el proyecto en el state
            dispatch({
                type: AGREGAR_EDITORIAL,
                payload: resultado.data
            });            
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                editorial: 'alerta-error'
            }
            // dispatch({
            //     type: PROYECTO_ERROR,
            //     payload: alerta
            // });
        }

    }

    // Editar editorial existente
    const editarEditorial = async editorial => {

        try {
            const resultado = await axios.post('http://localhost:8000/api/updatePublisher', 
            editorial,
            { headers: { Authorization: `Bearer ${token}` }});
            console.log(resultado);
            // Insertar el proyecto en el state
            dispatch({
                type: EDITAR_EDITORIAL,
                payload: resultado.data
            });            
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                editorial: 'alerta-error'
            }
            // dispatch({
            //     type: PROYECTO_ERROR,
            //     payload: alerta
            // });
        }

    }
    
    // Elimina una editorial
    const eliminarEditorial = async id => {
        try {
            await axios.post('http://localhost:8000/api/deletePublisher', 
            { id },
            { headers: { Authorization: `Bearer ${token}` }});
            dispatch({
                type: ELIMINAR_EDITORIAL,
                payload: id
            });
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                editorial: 'alerta-error'
            }
            // dispatch({
            //     type: PROYECTO_ERROR,
            //     payload: alerta
            // });
        }
    }

    return (
        <editorialContext.Provider
            value={{
                editoriales: state.editoriales,
                cargando: state.cargando,
                obtenerEditoriales,
                agregarEditorial,
                editarEditorial,
                eliminarEditorial,
            }}
        >
            {props.children}
        </editorialContext.Provider>
    );
}

export default EditorialState;