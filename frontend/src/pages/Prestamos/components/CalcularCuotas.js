import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  LinearProgress,
} from '@mui/material';

const CalcularCuotas = ({ monto, plazo, tasa, tipo }) => {
  const [cuotas, setCuotas] = React.useState([]);
  const [totalInteres, setTotalInteres] = React.useState(0);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    if (monto && plazo && tasa) {
      const montoNum = parseFloat(monto);
      const plazoNum = parseInt(plazo);
      const tasaNum = parseFloat(tasa) / 100;

      let cuotasArray = [];
      let totalInteresAcumulado = 0;
      let saldo = montoNum;

      if (tipo === 'simple') {
        // Cálculo de interés simple
        const interes = montoNum * tasaNum;
        const cuota = (montoNum + interes) / plazoNum;

        for (let i = 1; i <= plazoNum; i++) {
          cuotasArray.push({
            numero: i,
            capital: montoNum / plazoNum,
            interes: interes / plazoNum,
            total: cuota,
            saldo: montoNum - (i * (montoNum / plazoNum)),
          });
        }

        totalInteresAcumulado = interes;
      } else {
        // Cálculo de interés compuesto
        const cuota = montoNum * (tasaNum / 12) / (1 - Math.pow(1 + (tasaNum / 12), -plazoNum));

        for (let i = 1; i <= plazoNum; i++) {
          const interes = saldo * (tasaNum / 12);
          const capital = cuota - interes;
          saldo -= capital;

          cuotasArray.push({
            numero: i,
            capital: capital,
            interes: interes,
            total: cuota,
            saldo: saldo,
          });

          totalInteresAcumulado += interes;
        }
      }

      setCuotas(cuotasArray);
      setTotalInteres(totalInteresAcumulado);
      setTotal(montoNum + totalInteresAcumulado);
    }
  }, [monto, plazo, tasa, tipo]);

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Detalles de Cuotas
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1">Total de Intereses:</Typography>
          <Typography variant="h6" color="primary">
            ${totalInteres.toLocaleString()}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1">Monto Total a Pagar:</Typography>
          <Typography variant="h6" color="primary">
            ${total.toLocaleString()}
          </Typography>
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>N° Cuota</TableCell>
              <TableCell>Capital</TableCell>
              <TableCell>Interés</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Saldo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cuotas.map((cuota) => (
              <TableRow key={cuota.numero}>
                <TableCell>{cuota.numero}</TableCell>
                <TableCell>${cuota.capital.toLocaleString()}</TableCell>
                <TableCell>${cuota.interes.toLocaleString()}</TableCell>
                <TableCell>${cuota.total.toLocaleString()}</TableCell>
                <TableCell>${cuota.saldo.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Box sx={{ mt: 2 }}>
          <LinearProgress
            variant="determinate"
            value={cuotas.length > 0 ? (100 * (monto / total)) : 0}
            sx={{
              height: 10,
              borderRadius: 5,
              '& .MuiLinearProgress-bar': {
                borderRadius: 5,
              },
            }}
          />
          <Typography variant="caption" sx={{ mt: 1 }}>
            {cuotas.length > 0
              ? `Porcentaje de Capital: ${(100 * (monto / total)).toFixed(1)}%`
              : ''}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CalcularCuotas;
