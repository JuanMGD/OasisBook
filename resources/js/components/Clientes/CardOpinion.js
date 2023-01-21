import Rating from '@mui/material/Rating';
import './Opiniones.css'

const CardOpinion = ({rating}) => {
    return (
        <div className='card-opinion'>
            <Rating
                name="simple-controlled"
                value={rating?.stars}
                size="small"
                readOnly
            />
            {/* <p className='fecha'>06 jun 2022</p> */}
            <p>{rating?.comment}</p>
        </div>
    );
}
 
export default CardOpinion;