import { useContext, useEffect } from 'react';
import Table from 'react-bootstrap/Table';

import moment from 'moment';
import 'moment/locale/es';
// import IconButton from '@mui/material/IconButton';
// import VisibilityIcon from '@mui/icons-material/Visibility';

import libroContext from '../../context/libros/libroContext';
import ContenedorConCarga from '../Layout/ContenedorConCarga';


const Ventas = () => {
    const LibroContext = useContext(libroContext);
    const { libros, cargando, obtenerVentas } = LibroContext;

    useEffect(() => {
        obtenerVentas();
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <main>
                <ContenedorConCarga cargando={cargando}>
                    <div className="seccion">
                        <p className="titulo-seccion">Ventas</p>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Usuario</th>
                                    <th>Fecha</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {libros.map((venta, i) => (
                                    <tr key={`celda-venta-${i}`}>
                                        <td>{venta.name}</td>
                                        <td>{moment(venta.date, "YYYY-MM-DD").format('DD MMM YYYY')}</td>
                                        <td>${venta.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </ContenedorConCarga>
            </main>
        </div>
    );
}
 
export default Ventas;