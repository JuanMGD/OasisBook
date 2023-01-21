import { useState } from "react";

const useConfigFormulario = ({mostrar, fnAgregar, fnEditar}, estados=['Agregar', 'Editar']) => {
    const [configForm, setConfigForm] = useState({
        estado: 'Agregar',
        datos: null,
        accion: fnAgregar
    });

    const agregar = (datos=null) => {
        setConfigForm({estado: estados[0], datos: datos, accion: fnAgregar});
        mostrar()
    }

    const editar = (datos) => {
        setConfigForm({estado: estados[1], datos: datos, accion: fnEditar});
        mostrar()
    }

    return [configForm, agregar, editar];
}
 
export default useConfigFormulario;