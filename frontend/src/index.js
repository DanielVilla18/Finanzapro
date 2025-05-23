import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';

// Verificar si hay un token de autenticación al cargar la aplicación
const token = localStorage.getItem('token');
if (token) {
  // Aquí podrías despachar una acción para verificar el token con el backend
  console.log('Token encontrado, verificando...');
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
