import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  LinearProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  PieChart as PieChartIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  obtenerPrestamos,
  crearPrestamo,
  actualizarPrestamo,
  eliminarPrestamo 
} from '../../store/prestamoSlice';
import CalcularCuotas from './components/CalcularCuotas';

const Prestamos = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const prestamos = useSelector((state) => state.prestamos.data);
  const loading = useSelector((state) => state.prestamos.loading);
  const error = useSelector((state) => state.prestamos.error);
  const clientes = useSelector((state) => state.clientes.data);
  const [openDialog, setOpenDialog] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    cliente_id: '',
    monto_prestado: '',
    plazo: '',
    tasa_interes: '',
    tipo_interes: 'simple',
    notas: '',
  });

  const handleOpenDialog = (prestamo) => {
    if (prestamo) {
      setFormData({
        ...prestamo,
        cliente_id: prestamo.cliente_id.toString(),
      });
    } else {
      setFormData({
        cliente_id: '',
        monto_prestado: '',
        plazo: '',
        tasa_interes: '',
        tipo_interes: 'simple',
        notas: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await dispatch(actualizarPrestamo({
          id: formData.id,
          ...formData,
        }));
      } else {
        await dispatch(crearPrestamo(formData));
      }
      handleCloseDialog();
      dispatch(obtenerPrestamos());
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este préstamo?')) {
      try {
        await dispatch(eliminarPrestamo(id));
        dispatch(obtenerPrestamos());
      } catch (err) {
        console.error('Error:', err);
      }
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Gestión de Préstamos
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ mb: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Todos" icon={<PieChartIcon />} />
            <Tab label="Activos" />
            <Tab label="Vencidos" />
            <Tab label="Pagados" />
          </Tabs>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
              sx={{
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #2188F3 30%, #21BFF3 90%)',
                },
              }}
            >
              Nuevo Préstamo
            </Button>
          </Box>
          <Box>
            <TextField
              label="Buscar"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearch}
              sx={{ width: 300 }}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1 }} />,
              }}
            />
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Cliente</TableCell>
                      <TableCell>Monto</TableCell>
                      <TableCell>Plazo</TableCell>
                      <TableCell>Tasa</TableCell>
                      <TableCell>Estado</TableCell>
                      <TableCell>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          <CircularProgress />
                        </TableCell>
                      </TableRow>
                    ) : prestamos?.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          No hay préstamos registrados
                        </TableCell>
                      </TableRow>
                    ) : (
                      prestamos
                        .filter((prestamo) =>
                          prestamo.cliente?.nombre
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                        )
                        .map((prestamo) => (
                          <TableRow key={prestamo.id}>
                            <TableCell>{prestamo.cliente?.nombre}</TableCell>
                            <TableCell>
                              ${prestamo.monto_prestado.toLocaleString()}
                            </TableCell>
                            <TableCell>
                              {prestamo.plazo} meses
                            </TableCell>
                            <TableCell>
                              {prestamo.tasa_interes}%
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={prestamo.estado}
                                color={
                                  prestamo.estado === 'Pagado Completamente'
                                    ? 'success'
                                    : prestamo.estado === 'Incumplido'
                                    ? 'error'
                                    : 'primary'
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', gap: 1 }}>
                                <Tooltip title="Ver Detalles">
                                  <IconButton
                                    onClick={() => navigate(`/prestamos/${prestamo.id}`)}
                                    size="small"
                                  >
                                    <VisibilityIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Editar">
                                  <IconButton
                                    onClick={() => handleOpenDialog(prestamo)}
                                    size="small"
                                  >
                                    <EditIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Eliminar">
                                  <IconButton
                                    onClick={() => handleDelete(prestamo.id)}
                                    size="small"
                                    color="error"
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Resumen de Préstamos
              </Typography>
              <Box sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1">
                    Total Prestado
                  </Typography>
                  <Typography variant="h5" color="primary">
                    ${prestamos?.reduce(
                      (sum, p) => sum + p.monto_prestado,
                      0
                    ).toLocaleString()}
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1">
                    Pendiente de Cobro
                  </Typography>
                  <Typography variant="h5" color="primary">
                    ${prestamos?.reduce(
                      (sum, p) => 
                        p.estado !== 'Pagado Completamente' 
                          ? sum + p.monto_prestado 
                          : sum,
                      0
                    ).toLocaleString()}
                  </Typography>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Estado de Préstamos
                  </Typography>
                  <Box sx={{ height: 200 }}>
                    {/* Aquí iría el gráfico de estados */}
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {formData.id ? 'Editar Préstamo' : 'Nuevo Préstamo'}
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                  select
                  fullWidth
                  label="Cliente"
                  name="cliente_id"
                  value={formData.cliente_id}
                  onChange={handleChange}
                  required
                >
                  {clientes?.map((cliente) => (
                    <MenuItem key={cliente.id} value={cliente.id}>
                      {cliente.nombre}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                  fullWidth
                  label="Monto Prestado"
                  name="monto_prestado"
                  value={formData.monto_prestado}
                  onChange={handleChange}
                  type="number"
                  required
                  InputProps={{
                    startAdornment: <span>$</span>,
                  }}
                />
                <TextField
                  fullWidth
                  label="Plazo (meses)"
                  name="plazo"
                  value={formData.plazo}
                  onChange={handleChange}
                  type="number"
                  required
                />
              </Box>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                  fullWidth
                  label="Tasa de Interés"
                  name="tasa_interes"
                  value={formData.tasa_interes}
                  onChange={handleChange}
                  type="number"
                  required
                  InputProps={{
                    endAdornment: <span>%</span>,
                  }}
                />
                <TextField
                  select
                  fullWidth
                  label="Tipo de Interés"
                  name="tipo_interes"
                  value={formData.tipo_interes}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="simple">Simple</MenuItem>
                  <MenuItem value="compuesto">Compuesto</MenuItem>
                </TextField>
              </Box>
              <CalcularCuotas
                monto={formData.monto_prestado}
                plazo={formData.plazo}
                tasa={formData.tasa_interes}
                tipo={formData.tipo_interes}
              />
              <TextField
                fullWidth
                label="Notas"
                name="notas"
                value={formData.notas}
                onChange={handleChange}
                multiline
                rows={3}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #2188F3 30%, #21BFF3 90%)',
                },
              }}
            >
              {formData.id ? 'Actualizar' : 'Crear'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default Prestamos;
