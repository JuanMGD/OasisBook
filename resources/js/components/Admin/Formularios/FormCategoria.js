import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const FormCategoria = ({ datos, afterValidationAction }) => {
    
    const [validated, setValidated] = useState(false);

    const [datosForm, setDatosForm] = useState(datos ?? {
        name: '',
        description: '',
    });

    const { name, description } = datosForm;

    const actualizarInfoForm = (propiedad, valor) => {
        setDatosForm({
            ...datosForm,
            [propiedad]: valor
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        const formData = new FormData();
        Object.keys(datosForm).map((propiedad) => formData.append(propiedad, datosForm[propiedad]));
        
        setValidated(true);
        afterValidationAction(formData);
    };
    
    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Nombre"
                    aria-describedby="inputGroupPrepend"
                    required
                    maxLength={45}
                    defaultValue={name}
                    onChange={e => actualizarInfoForm('name', e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                Por favor ingrese un nombre.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3"controlId="exampleForm.ControlTextarea1">
                <Form.Label>Descripción</Form.Label>
                <Form.Control 
                    as="textarea" 
                    placeholder="(Opcional)" 
                    rows={5} 
                    maxLength={150}
                    defaultValue={description}
                    onChange={e => actualizarInfoForm('description', e.target.value)}
                />
            </Form.Group>
            <Button type="submit">Guardar</Button>
        </Form>
    );
}
 
export default FormCategoria;