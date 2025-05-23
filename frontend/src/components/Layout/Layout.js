import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, IconButton, Badge, Avatar, Button } from '@mui/material';
import { Notifications, Menu as MenuIcon, Dashboard, People, MonetizationOn } from '@mui/icons-material';
import { useSelector } from 'react-redux';

const Layout = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/' },
    { text: 'Clientes', icon: <People />, path: '/clientes' },
    { text: 'Préstamos', icon: <MonetizationOn />, path: '/prestamos' },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 280,
          bgcolor: 'background.paper',
          borderRight: 1,
          borderColor: 'divider',
          display: 'flex',
          flexDirection: 'column',
          p: 2,
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            FinanzaPro
          </Typography>
        </Box>
        
        {/* Menú de navegación */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" sx={{ mb: 1, fontWeight: 600, color: 'text.secondary', px: 2 }}>
            Navegación
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {menuItems.map((item) => (
              <Button
                key={item.path}
                variant={location.pathname === item.path ? 'contained' : 'text'}
                startIcon={item.icon}
                onClick={() => navigate(item.path)}
                sx={{
                  justifyContent: 'flex-start',
                  borderRadius: 2,
                  textTransform: 'none',
                  px: 2,
                  py: 1.5,
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                  ...(location.pathname === item.path && {
                    bgcolor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                  }),
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>
        </Box>
      </Box>
      
      {/* Contenido principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: '280px',
          width: 'calc(100% - 280px)',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <AppBar 
          position="static" 
          color="default" 
          elevation={0}
          sx={{
            bgcolor: 'background.paper',
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 500 }}>
              {menuItems.find(item => item.path === location.pathname)?.text || 'Dashboard'}
            </Typography>
            <IconButton color="inherit" sx={{ color: 'text.primary' }}>
              <Badge badgeContent={4} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton color="inherit" sx={{ ml: 1, color: 'text.primary' }}>
              <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main' }}>
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </Avatar>
            </IconButton>
          </Toolbar>
        </AppBar>
        
        {/* Contenido de la ruta */}
        <Box sx={{ flexGrow: 1, p: 3, bgcolor: 'background.default' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
