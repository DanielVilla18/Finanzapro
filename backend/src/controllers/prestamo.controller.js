const Prestamo = require('../models/Prestamo');
const Cuota = require('../models/Cuota');
const Cliente = require('../models/Cliente');
const { calcularCuotas } = require('../utils/calculos');

// Obtener todos los préstamos
exports.obtenerPrestamos = async (req, res) => {
    try {
        const prestamos = await Prestamo.findAll({
            include: [
                {
                    model: Cliente,
                    as: 'cliente'
                },
                {
                    model: Cuota,
                    as: 'cuotas'
                }
            ]
        });
        res.json(prestamos);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los préstamos');
    }
};

// Obtener un préstamo específico
exports.obtenerPrestamo = async (req, res) => {
    try {
        const prestamo = await Prestamo.findByPk(req.params.id, {
            include: [
                {
                    model: Cliente,
                    as: 'cliente'
                },
                {
                    model: Cuota,
                    as: 'cuotas'
                }
            ]
        });
        if (!prestamo) {
            return res.status(404).json({ msg: 'Préstamo no encontrado' });
        }
        res.json(prestamo);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el préstamo');
    }
};

// Crear un nuevo préstamo
exports.crearPrestamo = async (req, res) => {
    try {
        const { cliente_id, monto_prestado, plazo, tasa_interes, tipo_interes } = req.body;

        // Calcular cuotas
        const cuotas = calcularCuotas(monto_prestado, plazo, tasa_interes, tipo_interes);

        // Crear préstamo
        const prestamo = await Prestamo.create({
            cliente_id,
            monto_prestado,
            plazo,
            tasa_interes,
            tipo_interes,
            estado: 'Solicitado'
        });

        // Crear cuotas asociadas
        for (const cuota of cuotas) {
            await Cuota.create({
                prestamo_id: prestamo.id,
                ...cuota
            });
        }

        res.status(201).json(prestamo);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear el préstamo');
    }
};

// Actualizar un préstamo
exports.actualizarPrestamo = async (req, res) => {
    try {
        const prestamo = await Prestamo.findByPk(req.params.id);
        if (!prestamo) {
            return res.status(404).json({ msg: 'Préstamo no encontrado' });
        }

        await prestamo.update(req.body);
        res.json(prestamo);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el préstamo');
    }
};

// Eliminar un préstamo
exports.eliminarPrestamo = async (req, res) => {
    try {
        const prestamo = await Prestamo.findByPk(req.params.id);
        if (!prestamo) {
            return res.status(404).json({ msg: 'Préstamo no encontrado' });
        }

        await prestamo.destroy();
        res.json({ msg: 'Préstamo eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar el préstamo');
    }
};

// Obtener cuotas de un préstamo
exports.obtenerCuotas = async (req, res) => {
    try {
        const cuotas = await Cuota.findAll({
            where: { prestamo_id: req.params.prestamoId }
        });
        res.json(cuotas);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las cuotas');
    }
};

// Obtener una cuota específica
exports.obtenerCuota = async (req, res) => {
    try {
        const cuota = await Cuota.findByPk(req.params.cuotaId, {
            where: { prestamo_id: req.params.prestamoId }
        });
        if (!cuota) {
            return res.status(404).json({ msg: 'Cuota no encontrada' });
        }
        res.json(cuota);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener la cuota');
    }
};

// Actualizar una cuota
exports.actualizarCuota = async (req, res) => {
    try {
        const cuota = await Cuota.findByPk(req.params.cuotaId, {
            where: { prestamo_id: req.params.prestamoId }
        });
        if (!cuota) {
            return res.status(404).json({ msg: 'Cuota no encontrada' });
        }

        await cuota.update(req.body);
        res.json(cuota);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar la cuota');
    }
};
