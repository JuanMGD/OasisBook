import { useState } from 'react';
import Rating from '@mui/material/Rating';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const FormValoracion = ({ datos, afterSubmitAction }) => {
    const [datosForm, setDatosForm] = useState(datos ?? {
        stars: 1,
        comment: '',
    });

    const { stars, comment } = datosForm;

    const actualizarInfoForm = (propiedad, valor) => {
        setDatosForm({
            ...datosForm,
            [propiedad]: valor
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        Object.keys(datosForm).map((propiedad) => formData.append(propiedad, datosForm[propiedad]));
        afterSubmitAction(formData);
    };
    
    return (
        <>
            <p className='m-none'>Calificación</p>
            <Rating
                name="simple-controlled"
                defaultValue={stars}
                value={stars}
                onChange={(_, valor) => actualizarInfoForm('stars', valor)}
                // onChange={(event, newValue) => { setValue(newValue) }}
            />
            <Form>
                <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
                >
                    <Form.Label>Cuéntanos tu opinión</Form.Label>
                    <Form.Control 
                        maxLength={250} 
                        as="textarea" 
                        rows={5} 
                        defaultValue={comment}
                        // value={comment}
                        onChange={e => actualizarInfoForm('comment', e.target.value)}
                    />
                </Form.Group>
            </Form>
            <Button variant="primary" onClick={handleSubmit}>Calificar</Button>
        </>
    );
}
 
export default FormValoracion;