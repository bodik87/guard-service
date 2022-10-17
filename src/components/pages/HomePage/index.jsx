import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Orders from '../../Orders/Orders';
import { useDispatch, useSelector } from 'react-redux';
import { getClients } from '../../../store/clients/clientsSlice';
import { CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const mdTheme = createTheme();

function DashboardContent() {

  const dispatch = useDispatch();
  const { clients, isLoading } = useSelector(state => state.clients);

  React.useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  const [sort, setSort] = React.useState('');
  const handleSort = (event) => {
    setSort(event.target.value)
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', mb: 4 }}>
                  <TextField
                    sx={{ minWidth: 300 }}
                    id="outlined-basic"
                    label="Пошук"
                    variant="outlined"
                  />
                  <FormControl sx={{ ml: 2, minWidth: 200 }}>
                    <InputLabel id="sort">Сортування</InputLabel>
                    <Select
                      labelId="street"
                      id="sort"
                      value={sort}
                      name="street"
                      label="Сортування"
                      onChange={handleSort}
                    >
                      <MenuItem value={'Депозит 0'}>Депозит 0</MenuItem>
                      <MenuItem value={'Заборгованiсть'}>Заборгованiсть</MenuItem>
                      <MenuItem value={'Без авто'}>Без авто</MenuItem>
                      <MenuItem value={'Вiдмiнити сортування'}>Вiдмiнити сортування</MenuItem>
                    </Select>
                  </FormControl>
                </Paper>
                {isLoading ? <CircularProgress /> : <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  {clients && <Orders clients={clients} />}
                </Paper>}
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider >
  );
}

export default function HomePage() {
  return <DashboardContent />;
}