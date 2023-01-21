import clienteAxios from './axios';

const tokenAuth = token => {
    if (token) {
        // clienteAxios.headers['Authorization'] = `Bearer ${token}`;
        clienteAxios.defaults.headers.common['Authorization'] = token;
    } else {
        // delete clienteAxios.headers['Authorization'];
        delete clienteAxios.defaults.headers.common['Authorization'];
    }
}

export default tokenAuth;