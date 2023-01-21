import CircularProgress, { circularProgressClasses } from '@mui/material/CircularProgress';

const Loader = () => {
    return (
        <div className='w-full h-full contenedor-flex align-center'>
            <CircularProgress size={60} sx={{
                margin: '0 auto',
                [`& .${circularProgressClasses.circle}`]: {
                    strokeLinecap: 'round',
                    // color: 'linear-gradient(to right, #005283, #0bc3e9)',
                  },
            }} />
        </div>
    );
}
 
export default Loader;