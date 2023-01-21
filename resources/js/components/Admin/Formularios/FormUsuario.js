import { useState, useEffect, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import rolContext from '../../../context/roles/rolContext';

const FormUsuario = ({ datos, afterValidationAction }) => {

    const RolContext = useContext(rolContext);
    const { roles, obtenerRoles } = RolContext;

    useEffect(() => {
        obtenerRoles();
        // eslint-disable-next-line
    }, []);
    
    const [validated, setValidated] = useState(false);

    const [datosForm, setDatosForm] = useState(datos ?? {
        email: '',
        password: '',
        name: '',
        role_id: '',
    });

    console.log(datos);

    const { email, name, role_id } = datosForm;

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
                <Form.Label>Correo</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Correo"
                    aria-describedby="inputGroupPrepend"
                    required
                    defaultValue={email}
                    onChange={e => actualizarInfoForm('email', e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                Por favor ingrese un correo válido.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Nombre</Form.Label>
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
            </Form.Group>
            
            {datos === null 
            ? 
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Contraseña"
                    aria-describedby="inputGroupPrepend"
                    required
                    minLength={8}
                    // defaultValue={password}
                    onChange={e => actualizarInfoForm('password', e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                Por favor ingrese una contraseña con al menos 8 caracteres.
                </Form.Control.Feedback>
            </Form.Group>
            : null
            }

            <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                <Form.Label>Rol</Form.Label>
                <Form.Control required as="select" type="select" onChange={e => actualizarInfoForm('role_id', e.target.value)} value={role_id}>
                    <option value="">Seleccione un rol</option>
                    {roles.map(({id, name}) => <option key={`option-rol-${id}`} value={id}>{name}</option>)}
                    {/* <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option> */}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                    Por favor seleccione un rol.
                </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit">Guardar</Button>
        </Form>
    );
}
 
export default FormUsuario;