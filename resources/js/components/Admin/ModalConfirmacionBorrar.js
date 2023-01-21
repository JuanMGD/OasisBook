import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ModalConfirmacionBorrar = ({ entidad="", show, onHide, children }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>¿Desea eliminar {entidad}?</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                { children }
            </Modal.Body>
        </Modal>
    );
}
 
export default ModalConfirmacionBorrar;