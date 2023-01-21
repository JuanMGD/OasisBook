import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import { BsPlusLg, BsDashLg } from "react-icons/bs";
import '../../../css/app.css';

const SeccionCantidadProducto = ({limite}) => {

    const [cantidad, setCantidad] = useState(1)

    return (
        <div className='contenedor-flex gap align-center'>
            <p className='m-none'>Cantidad:</p>
            <div className='contenedor-flex gap'>
                <Button className='mt-auto' variant="primary" disabled={cantidad <= 1} onClick={() => setCantidad(cantidad - 1)}>
                    <BsDashLg/>
                </Button>
                <p className='m-none'>{cantidad}</p>
                <Button className='mt-auto' variant="primary" disabled={cantidad >= limite} onClick={() => setCantidad(cantidad + 1)}>
                    <BsPlusLg/>
                </Button>
            </div>
        </div>
    );
}
 
export default SeccionCantidadProducto;