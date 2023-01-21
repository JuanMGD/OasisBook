import { useState, useEffect, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DragDropImage from './DragDropImage';

import autorContext from '../../../context/autores/autorContext';
import editorialContext from '../../../context/editoriales/editorialContext';
import categoriaContext from '../../../context/categorias/categoriaContext';

const FormLibro = ({ datos, afterValidationAction }) => {
    const AutorContext = useContext(autorContext);
    const { autores, obtenerAutores } = AutorContext;

    const EditorialContext = useContext(editorialContext);
    const { editoriales, obtenerEditoriales } = EditorialContext;

    const CategoriaContext = useContext(categoriaContext);
    const { categorias, obtenerCategorias } = CategoriaContext;


    useEffect(() => {
        obtenerAutores();
        obtenerEditoriales();
        obtenerCategorias();
        // eslint-disable-next-line
    }, []);
    
    const [validated, setValidated] = useState(false);

    const [datosForm, setDatosForm] = useState(datos ?? {
        title: '',
        description: '',
        price: '',
        stock: 0,
        image: null,
        category_id: 1,
        author_id: 1,
        publisher_id: 1,
    });

    const { title, description, price, stock, image, category_id, author_id, publisher_id } = datosForm;

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
        const { image, ...datosLibro } = datosForm;
        Object.keys(datosLibro).map((propiedad) => formData.append(propiedad, datosForm[propiedad]));
        
        // Si al editar la imagen cambia la anexa, de otro modo la coloca en null
        if (datos) formData.append('image', image !== datos.image ? image : '');
        // Si no se está editando simplemente se agrega la imagen 
        else formData.append('image', image);

        setValidated(true);
        afterValidationAction(formData);
    };
    
    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-1">
                <Form.Group  as={Col} controlId="exampleForm.ControlFile1">
                    <Form.Label>Image</Form.Label>
                    <DragDropImage imagen={image} setImagen={(imagen) => actualizarInfoForm('image', imagen)}/>
                    <Form.Control.Feedback type="invalid">
                        Por favor añada una imagen.
                    </Form.Control.Feedback>
                </Form.Group>
                <Col>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Título</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Título"
                            aria-describedby="inputGroupPrepend"
                            required
                            defaultValue={title}
                            onChange={e => actualizarInfoForm('title', e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor ingrese un nombre.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        placeholder="Descripción" 
                        rows={5} 
                        maxLength={500}
                        defaultValue={description}
                        onChange={e => actualizarInfoForm('description', e.target.value)}
                    />
                </Form.Group>
                </Col>
            </Row>

            <Row className="mb-2">
                <Form.Group as={Col} controlId="exampleForm.ControlInput1">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Precio"
                        aria-describedby="inputGroupPrepend"
                        required
                        step="any"
                        max={1500}
                        min={1}
                        defaultValue={price}
                        onChange={e => actualizarInfoForm('price', e.target.value)}
                    />
                    <Form.Text id="priceHelpBlock" muted>
                        Ingrese una cantidad mayor a 0 sin comas.
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                        Por favor ingrese un precio válido para el libro.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="exampleForm.ControlInput1">
                    <Form.Label>stock</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Existencias"
                        aria-describedby="inputGroupPrepend"
                        required
                        max={150}
                        min={0}
                        defaultValue={stock}
                        onChange={e => actualizarInfoForm('stock', e.target.value)}
                    />
                    {/* <Form.Text id="priceHelpBlock" muted>
                        Cantidad mínima: 0
                    </Form.Text> */}
                    <Form.Control.Feedback type="invalid">
                        Por favor ingrese una cantidad válida de unidades (Puede ser 0).
                    </Form.Control.Feedback>
                </Form.Group>          
            </Row>

            <Row className="mb-2">
                <Form.Group as={Col} controlId="exampleForm.ControlSelect1">
                    <Form.Label>Categoría</Form.Label>
                    <Form.Control required as="select" type="select" onChange={e => actualizarInfoForm('category_id', e.target.value)} value={category_id}>
                        <option value="">Seleccione una categoría</option>
                        {categorias.map(({id, name}) => <option key={`option-categoria-${id}`} value={id}>{name}</option>)}
                        {/* <option value="1">Ciencia Ficción</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option> */}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Por favor seleccione una categoría.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="exampleForm.ControlSelect2">
                    <Form.Label>Autor</Form.Label>
                    <Form.Control required as="select" type="select" onChange={e => actualizarInfoForm('author_id', e.target.value)} value={author_id}>
                        <option value="">Seleccione un autor</option>
                        {autores.map(({id, name}) => <option key={`option-autor-${id}`} value={id}>{name}</option>)}
                        {/* <option value="1">Gabriel García Márquez</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option> */}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Por favor seleccione un autor.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="exampleForm.ControlSelect3">
                    <Form.Label>Editorial</Form.Label>
                    <Form.Control required as="select" type="select" onChange={e => actualizarInfoForm('publisher_id', e.target.value)} value={publisher_id}>
                        <option value="">Seleccione una editorial</option>
                        {editoriales.map(({id, name}) => <option key={`option-editorial-${id}`} value={id}>{name}</option>)}
                        {/* <option value="1">Editorial Diana</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option> */}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Por favor seleccione una editorial.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            
            <Button type="submit">Guardar</Button>
        </Form>
    );
}
 
export default FormLibro;