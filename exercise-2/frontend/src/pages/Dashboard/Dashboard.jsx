import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import io from 'socket.io-client';
import ProductTable from "../../components/ProductTable/ProductTable";
import { massiveUpdateProducts } from '../../services/productService';

const socket = io('http://localhost:3001');

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${props.value.toFixed(2)}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function Dashboard() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    socket.on('message', (data) => {
      setProgress(parseFloat(data.percentage));
      console.log('percentage => ', data.percentage);
    });

    console.log(import.meta.env.VITE_WHAREHOUSE_ID)
    console.log(import.meta.env.VITE_MERCHANT_ID)
    console.log(import.meta.env.VITE_CLIENT_ID)
    console.log(import.meta.env.VITE_CLIENT_SECRET)
    console.log(import.meta.env.VITE_BASE_URL)

    return () => {
      socket.off('message');
    };
  }, []);

  const updateProducts = () => {
    massiveUpdateProducts();
  }

  return (
    <Box sx={{margin: 'auto', width: '80%', backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem'}}>
      <h2 style={{marginTop: '1px'}}>Stock de Productos</h2>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Button fullWidth variant="contained" color="primary" sx={{ textTransform: 'none', fontWeight: 'bold' }}>
            Establecer cantidades aleatorias
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button fullWidth variant="contained" color="error" sx={{ textTransform: 'none', fontWeight: 'bold' }}
            onClick={updateProducts}
          >
            Actualización masiva
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ width: '100%', marginTop: '1rem' }}>
        <LinearProgressWithLabel style={{ height: '8px' }} value={progress} />
      </Box>
      
      <ProductTable/>
      {/* <Product/> */}
    </Box>
  );
}
