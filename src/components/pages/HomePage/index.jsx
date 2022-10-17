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
import RangeSlider from '../../Slider/Slider';
import { useFilterZeroDeposite } from '../../../hooks/useFilterZeroDeposite';
import { useFilterNegativeDeposite } from '../../../hooks/useFilterNegativeDeposite';
import { useFilterWithoutCar } from '../../../hooks/useFilterWithoutCar';

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

  const { clients, isLoading } = useSelector(state => state.clients);
  const dispatch = useDispatch();
  const [displayedСlients, setDisplayedСlients] = React.useState(clients || [])
  const { filteredZeroDeposites } = useFilterZeroDeposite(clients || [])
  const { filteredNegativeDeposites } = useFilterNegativeDeposite(clients || [])
  const { filteredWithoutCar } = useFilterWithoutCar(clients || [])

  React.useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  React.useEffect(() => {
    setDisplayedСlients(clients);
  }, [clients]);



  ////////////
  const [searchingQuery, setSearchingQuery] = React.useState('')
  const filteredClients = displayedСlients && displayedСlients.filter(client => {
    const searchingData = client.clientName + (client.phoneNumber ? client.phoneNumber : '')
    return searchingData.includes(searchingQuery)
  })

  const handlerSearchingQuery = (e) => {
    setSearchingQuery(e.target.value)
    setDisplayedСlients(filteredClients)
  }

  // const debouncedInput = useDebounce(updateSelectedCategoryPractice, 500)

  // const handleChangePracticeText = (e) => {
  //   handlerSearchingQuery(e.target.value)
  //   debouncedInput(e)
  // }


  console.log(filteredClients);

  //////////////
  const [sort, setSort] = React.useState('');

  // filtering
  const handleSort = (event) => {
    setSort(event.target.value)
    if (event.target.value === 'zeroDeposite') setDisplayedСlients(filteredZeroDeposites)
    if (event.target.value === 'negativeDeposite') setDisplayedСlients(filteredNegativeDeposites)
    if (event.target.value === 'withoutCar') setDisplayedСlients(filteredWithoutCar)
    if (event.target.value === 'resetFilter') setDisplayedСlients(clients)
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
                    label="Пошук за ПIБ або телефоном"
                    variant="outlined"
                    value={searchingQuery}
                    onChange={handlerSearchingQuery}
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
                      <MenuItem value={'zeroDeposite'}>Депозит 0</MenuItem>
                      <MenuItem value={'negativeDeposite'}>Заборгованiсть</MenuItem>
                      <MenuItem value={'withoutCar'}>Без авто</MenuItem>
                      <MenuItem value={'resetFilter'}>Вiдмiнити сортування</MenuItem>
                    </Select>
                  </FormControl>
                  <RangeSlider />
                </Paper>
                {isLoading ? <CircularProgress /> : <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  {displayedСlients && <Orders clients={displayedСlients} />}
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