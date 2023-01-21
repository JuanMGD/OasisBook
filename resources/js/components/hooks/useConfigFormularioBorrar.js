import { useState } from "react";

const useConfigFormularioBorrar = (mostrar, fnBorrar) => {
    const [configForm, setConfigForm] = useState({
        id: null,
        accion: fnBorrar
    });
    
    const borrar = (id) => {
        setConfigForm({id, accion: fnBorrar});
        mostrar()
    }

    return [configForm, borrar];
}
 
export default useConfigFormularioBorrar;