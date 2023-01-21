import LibroState from '../context/libros/libroState';
import CategoriaState from '../context/categorias/categoriaState';
import AutorState from '../context/autores/autorState';
import EditorialState from '../context/editoriales/editorialState';
import UsuarioState from '../context/usuarios/usuarioState';
import RolState from '../context/roles/rolState';
import CarritoState from '../context/carrito/carritoState';
import AuthState from '../context/autenticacion/authState';

const ContextContainer = ({ children }) => {
    return (
        <AuthState>
            <CarritoState>
                <RolState>
                    <UsuarioState>
                        <EditorialState>
                            <AutorState>
                                <CategoriaState>
                                    <LibroState>
                                        { children }
                                    </LibroState>
                                </CategoriaState>
                            </AutorState>
                        </EditorialState>
                    </UsuarioState>
                </RolState>
            </CarritoState>
        </AuthState>
    );
}
 
export default ContextContainer;