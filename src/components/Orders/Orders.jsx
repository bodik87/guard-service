import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../paths';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Title/Title';
import EditIcon from '@mui/icons-material/Edit';


export default function Orders({ clients }) {
  const navigate = useNavigate();

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
            <TableCell>Депозит</TableCell>
            <TableCell align="right">Редагувати</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((client) => (
            <TableRow
              key={client.id}
            >
              <TableCell>{client.clientName}</TableCell>
              <TableCell>{`${client.street} ${client.house}, кв.${client.apartment}`}</TableCell>
              <TableCell>{client.phoneNumber}</TableCell>
              <TableCell>{client.carPlateNumber ? client.carPlateNumber : '-'}</TableCell>
              <TableCell>{`${client.deposit} грн`}</TableCell>
              <TableCell align="right"><EditIcon
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`${paths.client}/${client.id}`)}
              /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}