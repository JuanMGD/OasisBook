import { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const FormAutor = ({ datos, afterValidationAction }) => {
    
    const [validated, setValidated] = useState(false);

    const [datosForm, setDatosForm] = useState(datos ?? {
        name: '',
        about: '',
    });

    const { name, about } = datosForm;

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
                <InputGroup hasValidation>
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
                </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3"controlId="exampleForm.ControlTextarea1">
                <Form.Label>Acerca del autor</Form.Label>
                <Form.Control 
                    as="textarea" 
                    placeholder="(Opcional)" 
                    rows={5} 
                    maxLength={300}
                    defaultValue={about}
                    onChange={e => actualizarInfoForm('about', e.target.value)}
                />
            </Form.Group>
            <Button type="submit">Guardar</Button>
        </Form>
    );
}
 
export default FormAutor;