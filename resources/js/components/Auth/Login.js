import { useState, useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import './Login.css';

import authContext from '../../context/autenticacion/authContext';


const Login = () => {

    const AuthContext = useContext(authContext);
    const { token, rol, iniciarSesion, error, msjError } = AuthContext

    useEffect(() => {
    //   const token = localStorage.getItem('token');
    // console.log(rol);
      if (token) navigate(rol ? '/consola' : '/');
    }, [token]);
    

    const navigate = useNavigate();

    // const onSubmit = (e) => {
    //     e.preventDefault()
        
    //     const headers = {
    //         'Content-Type': 'application/json', 
    //         'Accept': 'application/json'
    //     }
          
    //     axios.post("http://localhost:8000/api/login", 
    //         credenciales,
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

    const [credenciales, setCredenciales] = useState({
        email: '',
        password: '',
    });

    const actualizarInfoForm = (propiedad, valor) => {
        setCredenciales({
            ...credenciales,
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
        Object.keys(credenciales).map((propiedad) => formData.append(propiedad, credenciales[propiedad]));
        
        setValidated(true);
        iniciarSesion(formData);
        // console.log(resultado);
        // navigate("/");
    };

    return (
        <main className="contenedor">
            <Form className="login-contenedor" noValidate validated={validated} onSubmit={handleSubmit}>
                <div className="logo-login">
                    <p className='text-logo'>OasisBook</p>
                </div>
                <h1 className="titulo">Iniciar sesión</h1>
                {error ? <Alert variant='danger'>{msjError}</Alert> : null}
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

                <Form.Group className="input-login mb-3" controlId="loginForm.ControlInputPassword">
                    <Form.Control
                        type="password"
                        placeholder="Contraseña"
                        aria-describedby="inputGroupPrepend"
                        required
                        // minLength={6}
                        onChange={e => actualizarInfoForm('password', e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                    Por favor ingrese su contraseña.
                    </Form.Control.Feedback>
                </Form.Group>
                {/* <Button type="submit">Guardar</Button> */}
                <button className="btnLogin" type="submit">Iniciar sesión</button>
                <Button onClick={() => navigate('/registro')} variant="link" type='button'>¿Aún no tienes cuenta? Regístrate</Button>
            </Form>
        </main>
    );
}
 
export default Login;