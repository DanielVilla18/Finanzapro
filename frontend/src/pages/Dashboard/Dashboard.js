import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Avatar,
  Stack,
  Paper,
  useTheme,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const Dashboard = () => {
  const theme = useTheme();
  
  // Datos de ejemplo para los gráficos
  const data = [
    { name: 'Ene', prestamos: 4000, pagos: 2400 },
    { name: 'Feb', prestamos: 3000, pagos: 1398 },
    { name: 'Mar', prestamos: 2000, pagos: 9800 },
    { name: 'Abr', prestamos: 2780, pagos: 3908 },
    { name: 'May', prestamos: 1890, pagos: 4800 },
    { name: 'Jun', prestamos: 2390, pagos: 3800 },
    { name: 'Jul', prestamos: 3490, pagos: 4300 },
  ];

  return (
    <Grid container spacing={3}>
      {/* Tarjetas de estadísticas */}
      <Grid item xs={12} md={3}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                <MonetizationOnIcon />
              </Avatar>
              <Box>
                <Typography color="textSecondary" gutterBottom variant="overline">
                  Préstamos Totales
                </Typography>
                <Typography variant="h4">$12,500</Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={3}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
                <PeopleIcon />
              </Avatar>
              <Box>
                <Typography color="textSecondary" gutterBottom variant="overline">
                  Clientes Activos
                </Typography>
                <Typography variant="h4">45</Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={3}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar sx={{ bgcolor: theme.palette.success.main }}>
                <CheckCircleIcon />
              </Avatar>
              <Box>
                <Typography color="textSecondary" gutterBottom variant="overline">
                  Pagos Recibidos
                </Typography>
                <Typography variant="h4">$8,200</Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={3}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar sx={{ bgcolor: theme.palette.warning.main }}>
                <PendingIcon />
              </Avatar>
              <Box>
                <Typography color="textSecondary" gutterBottom variant="overline">
                  Préstamos Pendientes
                </Typography>
                <Typography variant="h4">15</Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      {/* Gráfico */}
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Actividad Mensual
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="prestamos" fill={theme.palette.primary.main} />
                <Bar dataKey="pagos" fill={theme.palette.secondary.main} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>

      {/* Gráfico de progreso */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Objetivos Mensuales
            </Typography>
            <Box sx={{ width: '100%', mb: 2 }}>
              <Typography variant="body2" gutterBottom>
                Préstamos
              </Typography>
              <Box sx={{ width: '100%', mb: 2 }}>
                <LinearProgress variant="determinate" value={70} />
              </Box>
              <Typography variant="caption" color="textSecondary">
                70% completado
              </Typography>
            </Box>
            <Box sx={{ width: '100%', mb: 2 }}>
              <Typography variant="body2" gutterBottom>
                Recaudación
              </Typography>
              <Box sx={{ width: '100%', mb: 2 }}>
                <LinearProgress variant="determinate" value={85} />
              </Box>
              <Typography variant="caption" color="textSecondary">
                85% completado
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
