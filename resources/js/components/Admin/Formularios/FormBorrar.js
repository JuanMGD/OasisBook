import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const FormBorrar = ({ id, afterConfirmAction, cancelAction }) => {

    const handleSubmit = (event) => {
        event.preventDefault();
        afterConfirmAction(id);
    };
    
    return (
        <Form onSubmit={handleSubmit}>
            <p>Si lo hace, la información se perderá permanentemente</p>
            {/* <p>Si lo hace, toda la información asociada se perderá también</p> */}
            <Button className='mr-2' type="button" variant="secondary" onClick={cancelAction}>Cancelar</Button>
            <Button className='ml-2 mr-2' type="submit" variant="danger">Borrar</Button>
        </Form>
    );
}
 
export default FormBorrar;