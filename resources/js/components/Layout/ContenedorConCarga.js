import Loader from "./Loader";

const ContenedorConCarga = ({ cargando, children }) => {
    return (
        <>
            { cargando ? <Loader/> : children }
        </>
    );
}
 
export default ContenedorConCarga;