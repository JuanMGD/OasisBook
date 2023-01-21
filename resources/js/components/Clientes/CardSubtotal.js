import Button from 'react-bootstrap/Button';
import './ItemLibro.css';

const CardSubtotal = () => {
    return (
        <div className="card subtotal">
            <h4 className=''>{`Subtotal (${'2'} libros): ${'$650'}`}</h4>
            {/* <p className="autor">por <span>{'Gabriel García Márquez'}</span></p> */}
            <Button className='mt-auto' variant="primary"> Proceder al pago</Button>
        </div>
    );
}
 
export default CardSubtotal;