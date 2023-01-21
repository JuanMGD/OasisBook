import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import TextField from '@mui/material/TextField';
// import Alert from '@mui/material/Alert';

import './Login.css';

import authContext from '../../context/autenticacion/authContext';

const Registro = () => {

    const AuthContext = useContext(authContext);
    const { token, registrarUsuario, error, msjError } = AuthContext

    useEffect(() => {
    //   const token = localStorage.getItem('token');
      if (token) navigate(rol ? '/consola' : '/');
    }, [token]);
    

    const navigate = useNavigate();
    // const onSubmit = (e) => {
    //     e.preventDefault()
        
    //     const headers = {
    //         'Content-Type': 'application/json', 
    //         'Accept': 'application/json'
    //     }
          
    //     axios.post("http://localhost:8000/api/register", 
    //         datosUsuario,
    //         {headers})
    //         .then(response => {
    
    //         localStorage.setItem('token', response.data.token);
    
    //         localStorage.setItem('user', JSON.stringify(response.data.user));
    
    //         navigate("/");
            
    //     }).catch(error => {
    //         console.log('Contraseña o correo incorrectos');
    //     });
    // }
    const [validated, setValidated] = useState(false);

    const [datosUsuario, setDatosUsuario] = useState({
        email: '',
        name: '',
        password: '',
    });

    const actualizarInfoForm = (propiedad, valor) => {
        setDatosUsuario({
            ...datosUsuario,
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
        Object.keys(datosUsuario).map((propiedad) => formData.append(propiedad, datosUsuario[propiedad]));
        
        setValidated(true);
        registrarUsuario(formData);
        // console.log(resultado);
        // navigate("/");
    };

    return (
        <main className="contenedor">
            {/* <form className="login-contenedor" onSubmit={onSubmit}>
                <div className="logo-login">
                    <p className='text-logo'>OasisBook</p>
                </div>
                <h1 className="titulo">Registro</h1>
                <TextField 
                    sx={{
                        width: '70%',
                        margin:'0.5rem auto'
                    }}
                    type='email'
                    size="small"
                    margin="dense"
                    value={email} 
                    label="Ingrese su correo" 
                    fullWidth 
                    onChange={e => guardarInformacion('email', e.target.value)}
                    variant="outlined" 
                />
                
                <TextField 
                    sx={{
                        width: '70%',
                        margin:'0.5rem auto'
                    }}
                    type='text'
                    size="small"
                    margin="dense"
                    value={nombre} 
                    label="Ingrese su nombre" 
                    fullWidth 
                    onChange={e => guardarInformacion('nombre', e.target.value)}
                    variant="outlined" 
                />
            
                <TextField 
                    sx={{
                        width: '70%',
                        margin:'1rem auto 0.25rem auto'
                    }}
                    type='password'
                    size="small"
                    margin="dense"
                    value={password} 
                    label="Contraseña" 
                    fullWidth
                    onChange={e => guardarInformacion('password', e.target.value)}
                    variant="outlined" 
                />
                <button className="btnLogin" type="submit">Registrarse</button>
            </form> */}
            <Form className="login-contenedor" noValidate validated={validated} onSubmit={handleSubmit}>
                <div className="logo-login">
                    <p className='text-logo'>OasisBook</p>
                </div>
                <h1 className="titulo">Registro</h1>
                {/* {error ? <Alert variant='danger'>{msjError}</Alert> : null} */}
                <Form.Group className="input-login mb-3" controlId="loginForm.ControlInputEmail">
                    <Form.Control
                        type="email"
                        placeholder="Ingrese su correo"
                        aria-describedby="inputGroupPrepend"
                        required
                        onChange={e => actualizarInfoForm('email', e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                    Por favor ingrese un correo válido.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="input-login mb-3" controlId="loginForm.ControlInputEmail">
                    <Form.Control
                        type="text"
                        placeholder="Ingrese su nombre"
                        aria-describedby="inputGroupPrepend"
                        required
                        onChange={e => actualizarInfoForm('name', e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                    Por favor ingrese un correo válido.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="input-login mb-3" controlId="loginForm.ControlInputPassword">
                    <Form.Control
                        type="password"
                        placeholder="Contraseña"
                        aria-describedby="inputGroupPrepend"
                        required
                        minLength={8}
                        onChange={e => actualizarInfoForm('password', e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                    Por favor ingrese una contraseña con al menos 8 caracteres.
                    </Form.Control.Feedback>
                </Form.Group>
                {/* <Button type="submit">Guardar</Button> */}
                <button className="btnLogin" type="submit">Registrarse</button>
                <Button onClick={() => navigate('/login')} variant="link" type='button'>¿Ya tienes cuenta? Inicia sesión</Button>
            </Form>
        </main>
    );
}
 
export default Registro;