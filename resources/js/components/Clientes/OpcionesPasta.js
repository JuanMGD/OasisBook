import React, { useState } from 'react'

import './OpcionesPasta.css';

const OpcionesPasta = () => {

    const [seleccionado, setSeleccionado] = useState('dura')

    return (
        <div className="contenedor-opciones">
            <div className="opcion">
                <div 
                    className={`btn-opcion ${seleccionado === 'dura' ? 'seleccionado' : ''}`}
                    onClick={() => setSeleccionado('dura')}
                >
                    <p className='pasta'>Pasta dura</p>
                    <p className='precio'>$350</p>
                </div>
                <p className="existencias">19 disponibles</p>
            </div>
            <div className="opcion">
                <div 
                    className={`btn-opcion ${seleccionado === 'blanda' ? 'seleccionado' : ''}`}
                    onClick={() => setSeleccionado('blanda')}
                >
                    <p className='pasta'>Pasta blanda</p>
                    <p className='precio'>$250</p>
                </div>
                <p className="existencias">17 disponibles</p>
            </div>
        </div>
    );
}
 
export default OpcionesPasta;