// Función para calcular cuotas de préstamo
exports.calcularCuotas = (monto, plazo, tasa, tipo) => {
    const cuotas = [];
    const tasaMensual = tasa / 100 / 12;
    
    if (tipo === 'simple') {
        // Cálculo de interés simple
        const montoInteres = monto * (tasaMensual * plazo);
        const montoTotal = monto + montoInteres;
        const montoCuota = montoTotal / plazo;
        
        for (let i = 0; i < plazo; i++) {
            cuotas.push({
                numero: i + 1,
                monto_capital: monto / plazo,
                monto_interes: monto * tasaMensual,
                fecha_vencimiento: new Date(Date.now() + (i + 1) * 30 * 24 * 60 * 60 * 1000),
                estado: 'Pendiente'
            });
        }
    } else {
        // Cálculo de interés compuesto
        const montoCuota = (monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -plazo));
        let saldo = monto;
        
        for (let i = 0; i < plazo; i++) {
            const interes = saldo * tasaMensual;
            const capital = montoCuota - interes;
            saldo -= capital;
            
            cuotas.push({
                numero: i + 1,
                monto_capital: capital,
                monto_interes: interes,
                fecha_vencimiento: new Date(Date.now() + (i + 1) * 30 * 24 * 60 * 60 * 1000),
                estado: 'Pendiente'
            });
        }
    }
    
    return cuotas;
};
