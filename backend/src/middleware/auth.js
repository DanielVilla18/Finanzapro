const jwt = require('jsonwebtoken');
require('dotenv').config();

const validarJWT = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token no proporcionado'
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: 'Token inválido'
        });
      }

      req.usuario = decoded;
      next();
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en la autenticación',
      error: error.message
    });
  }
};

module.exports = {
  validarJWT
};
