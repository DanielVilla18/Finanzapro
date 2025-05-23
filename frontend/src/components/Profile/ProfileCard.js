import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Button,
  Divider,
  Stack,
} from '@mui/material';
import { useSelector } from 'react-redux';

const ProfileCard = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Card>
      <CardContent>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Avatar
            sx={{
              width: 100,
              height: 100,
              mb: 2,
              bgcolor: 'primary.main',
            }}
          >
            {user?.nombre?.[0] || 'U'}
          </Avatar>
          <Typography variant="h5" gutterBottom>
            {user?.nombre || 'Usuario'}
          </Typography>
          <Typography color="textSecondary">
            {user?.email || 'usuario@ejemplo.com'}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Stack spacing={2}>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Datos Personales
            </Typography>
            <Typography color="textSecondary">
              {user?.rol || 'Usuario'}
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Último Acceso
            </Typography>
            <Typography color="textSecondary">
              {new Date().toLocaleDateString()}
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Editar Perfil
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
