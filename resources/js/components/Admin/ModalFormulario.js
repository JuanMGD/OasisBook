import Modal from 'react-bootstrap/Modal';

const ModalFormulario = ({ size="md", estado, seccion="", show, onHide, children }) => {
    return (
        <Modal size={size} show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{estado} {seccion}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                { children }
            </Modal.Body>
            {/* <Modal.Footer>
            <BsButton variant="primary" onClick={handleClose}>
                Guardar
            </BsButton>
            </Modal.Footer> */}
        </Modal>
    );
}
 
export default ModalFormulario;