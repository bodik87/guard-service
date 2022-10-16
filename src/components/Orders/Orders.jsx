import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Title/Title';

// Generate Order Data
// function createData(

// ) {
//   return { id, date, name, shipTo, paymentMethod, amount };
// }

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders({ clients }) {

  const deposites = clients.map(client => client.deposit);

  const totalClientsDeposit = (clients) => clients.reduce((acc, client) => acc += +client, 0)
  const [clientsDeposit, setClientsDeposit] = React.useState(0)

  React.useEffect(() => {
    setClientsDeposit(totalClientsDeposit(deposites));
  }, [clients]);

  return (
    <React.Fragment>
      <Title>{`Загальна сума депозиту: ${clientsDeposit} грн`}</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ПIБ</TableCell>
            <TableCell>Адреса</TableCell>
            <TableCell>Телефон</TableCell>
            <TableCell>Номер авто</TableCell>
            <TableCell align="right">Депозит</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>{client.clientName}</TableCell>
              <TableCell>{`${client.street} ${client.house}, кв.${client.apartment}`}</TableCell>
              <TableCell>{client.phoneNumber}</TableCell>
              <TableCell>{client.carPlateNumber ? client.carPlateNumber : '-'}</TableCell>
              <TableCell align="right">{`${client.deposit} грн`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        Link
      </Link>
    </React.Fragment>
  );
}