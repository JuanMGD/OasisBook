import { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const FormRol = ({ datos, afterValidationAction }) => {
    
    const [validated, setValidated] = useState(false);

    const [datosForm, setDatosForm] = useState(datos ?? {
        name: '',
        allow_read: 0,
        allow_write: 0,
        allow_delete: 0,
        allow_manage_users: 0,
        allow_manage_roles: 0,
    });

    const { name, allow_read, allow_write, allow_delete, allow_manage_users, allow_manage_roles }  = datosForm;


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
        
        setValidated(true);
        afterValidationAction(datosForm);
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
                        defaultValue={name}
                        onChange={e => actualizarInfoForm('name', e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                    Por favor ingrese un nombre.
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Check 
                    checked={allow_read} 
                    onChange={e => actualizarInfoForm('allow_read', e.target.checked)} 
                    id="leer"
                    label="Visualizar información" 
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Check 
                    checked={allow_write} 
                    onChange={e => actualizarInfoForm('allow_write', e.target.checked)} 
                    id="escribir"
                    label="Agregar/Modificar información" 
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Check 
                    checked={allow_delete} 
                    onChange={e => actualizarInfoForm('allow_delete', e.target.checked)} 
                    id="eliminar"
                    label="Eliminar información" 
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Check 
                    checked={allow_manage_users} 
                    onChange={e => actualizarInfoForm('allow_manage_users', e.target.checked)} 
                    id="gestionar_usuarios"
                    label="Gestionar usuarios" 
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Check 
                    checked={allow_manage_roles} 
                    onChange={e => actualizarInfoForm('allow_manage_roles', e.target.checked)} 
                    id="gestionar_roles"
                    label="Gestionar roles" 
                />
            </Form.Group>
            <Button type="submit">Guardar</Button>
        </Form>
    );
}
 
export default FormRol;