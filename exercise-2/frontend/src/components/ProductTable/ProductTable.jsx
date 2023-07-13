import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

// Define your custom DataGrid component with custom styles
const StyledDataGrid = styled(DataGrid)({
  '& .MuiDataGrid-columnHeaderTitle': {
    fontWeight: 'bold',
  },
});

const initialRows = [
  { id: 1, code: 'C001', product: 'Producto 1', quantity: 10 },
  { id: 2, code: 'C002', product: 'Producto 2', quantity: 5 },
  { id: 3, code: 'C003', product: 'Producto 3', quantity: 20 },
  // Agrega más filas si es necesario...
];

export default function ProductTable() {
  const [rows, setRows] = React.useState(initialRows);

  const handleAddQuantity = React.useCallback((id) => {
    setRows(rows.map((row) => row.id === id ? { ...row, quantity: row.quantity + 1 } : row));
  }, [rows]);

  const handleSubtractQuantity = React.useCallback((id) => {
    setRows(rows.map((row) => row.id === id ? { ...row, quantity: row.quantity > 0 ? row.quantity - 1 : 0 } : row));
  }, [rows]);

  const columns = [
    { field: 'code', headerName: 'Código', width: 130 },
    { field: 'product', headerName: 'Producto', width: 568 },
    {
      field: 'quantity', 
      headerName: 'Cantidad', 
      width: 130,
      headerAlign: 'right',
      align: 'right'
    },
    {
      headerName: 'Acciones',
      width: 130,
      headerAlign: 'center',
      align: 'center',
      disableSorting: true,
      renderCell: (params) => (
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
          <Button color='error' onClick={() => handleSubtractQuantity(params.id)}>
            <RemoveIcon />
          </Button>
          <Button onClick={() => handleAddQuantity(params.id)}>
            <AddIcon />
          </Button>
        </ButtonGroup>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <StyledDataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        disableColumnMenu
      />
    </div>
  );
}
