# FinanzaPro - Gestión de Cobranzas y Préstamos

Sistema integral para la gestión de cobranzas y préstamos financieros.

## Características Principales

- Gestión completa de clientes
- Sistema de préstamos con cálculo automático de cuotas
- Registro y seguimiento de deudas
- Sistema de cobranzas y pagos
- Gestión de caja
- Dashboard y reportes financieros
- Sistema de alertas y notificaciones
- Multiusuario con roles y permisos

## Tecnologías Utilizadas

- Frontend: React.js + Material-UI
- Backend: Node.js + Express
- Base de Datos: PostgreSQL
- Autenticación: JWT
- API RESTful

## Requisitos Previos

- Node.js (v18 o superior)
- PostgreSQL (v14 o superior)
- npm o yarn

## Instalación

1. Clonar el repositorio
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Configurar variables de entorno:
   ```bash
   cp .env.example .env
   ```
4. Iniciar la base de datos y ejecutar las migraciones
5. Iniciar el servidor:
   ```bash
   npm run dev
   ```

## Estructura del Proyecto

```
finanzapro/
├── backend/           # Backend Node.js
├── frontend/          # Frontend React
├── docs/             # Documentación
├── scripts/          # Scripts de utilidad
└── tests/           # Pruebas
```

## Licencia

MIT
