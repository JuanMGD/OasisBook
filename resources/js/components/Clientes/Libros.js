import { Outlet  } from "react-router-dom";

import '../../../css/app.css';
// import './Libro.css';

const Libros = () => {
    return (
        <div className="seccion">
            {/* <h2>Categoría:</h2> */}
            <Outlet />
        </div>
    );
}
 
export default Libros;