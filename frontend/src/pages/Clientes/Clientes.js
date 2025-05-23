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
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  obtenerClientes,
  crearCliente,
  actualizarCliente,
  eliminarCliente 
} from '../../store/clienteSlice';

const Clientes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const clientes = useSelector((state) => state.clientes.data);
  const loading = useSelector((state) => state.clientes.loading);
  const error = useSelector((state) => state.clientes.error);
  const [openDialog, setOpenDialog] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    identificador_fiscal: '',
    direccion: '',
    telefono: '',
    email: '',
    persona_contacto: '',
    notas: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  const handleOpenDialog = (cliente) => {
    if (cliente) {
      setClienteSeleccionado(cliente);
      setFormData({
        nombre: cliente.nombre,
        identificador_fiscal: cliente.identificador_fiscal,
        direccion: cliente.direccion,
        telefono: cliente.telefono,
        email: cliente.email,
        persona_contacto: cliente.persona_contacto,
        notas: cliente.notas,
      });
    } else {
      setClienteSeleccionado(null);
      setFormData({
        nombre: '',
        identificador_fiscal: '',
        direccion: '',
        telefono: '',
        email: '',
        persona_contacto: '',
        notas: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setClienteSeleccionado(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (clienteSeleccionado) {
        await dispatch(actualizarCliente({
          id: clienteSeleccionado.id,
          ...formData,
        }));
      } else {
        await dispatch(crearCliente(formData));
      }
      handleCloseDialog();
      dispatch(obtenerClientes());
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este cliente?')) {
      try {
        await dispatch(eliminarCliente(id));
        dispatch(obtenerClientes());
      } catch (err) {
        console.error('Error:', err);
      }
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Gestión de Clientes
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

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
              Nuevo Cliente
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

        <Paper sx={{ p: 2 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Identificador Fiscal</TableCell>
                  <TableCell>Correo</TableCell>
                  <TableCell>Teléfono</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : clientes?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No hay clientes registrados
                    </TableCell>
                  </TableRow>
                ) : (
                  clientes
                    .filter((cliente) =>
                      cliente.nombre
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    )
                    .map((cliente) => (
                      <TableRow key={cliente.id}>
                        <TableCell>{cliente.nombre}</TableCell>
                        <TableCell>{cliente.identificador_fiscal}</TableCell>
                        <TableCell>{cliente.email}</TableCell>
                        <TableCell>{cliente.telefono}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Tooltip title="Editar">
                              <IconButton
                                onClick={() => handleOpenDialog(cliente)}
                                size="small"
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Eliminar">
                              <IconButton
                                onClick={() => handleDelete(cliente.id)}
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

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {clienteSeleccionado ? 'Editar Cliente' : 'Nuevo Cliente'}
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                  fullWidth
                  label="Nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
                <TextField
                  fullWidth
                  label="Identificador Fiscal"
                  name="identificador_fiscal"
                  value={formData.identificador_fiscal}
                  onChange={handleChange}
                  required
                />
              </Box>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                  fullWidth
                  label="Correo"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                />
                <TextField
                  fullWidth
                  label="Teléfono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                />
              </Box>
              <TextField
                fullWidth
                label="Dirección"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                multiline
                rows={2}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Persona de Contacto"
                name="persona_contacto"
                value={formData.persona_contacto}
                onChange={handleChange}
                sx={{ mb: 2 }}
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
              {clienteSeleccionado ? 'Actualizar' : 'Crear'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default Clientes;
