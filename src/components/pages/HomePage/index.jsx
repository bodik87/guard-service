import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClients } from '../../../store/clients/clientsSlice';
import Orders from '../../Orders/Orders';
import { useFilterZeroDeposite } from '../../../hooks/useFilterZeroDeposite';
import { useFilterNegativeDeposite } from '../../../hooks/useFilterNegativeDeposite';
import { useFilterWithoutCar } from '../../../hooks/useFilterWithoutCar';
import { useFilterRangeDeposite } from '../../../hooks/useFilterRangeDeposite';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Badge, Button, CircularProgress, FormControl, FormHelperText, IconButton, InputLabel, MenuItem, Select, Slider, TextField } from '@mui/material';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">Your Website</Link>{' '}
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
  const [sort, setSort] = React.useState('');

  const [range, setRange] = React.useState([0, 1000])
  const handlerRange = (e) => {
    setRange(e.target.value)
    // setDisplayedСlients(filteredRangeDeposites)
  }

  // Select
  const { filteredZeroDeposites } = useFilterZeroDeposite(clients || [])
  const { filteredNegativeDeposites } = useFilterNegativeDeposite(clients || [])
  const { filteredWithoutCar } = useFilterWithoutCar(clients || [])
  const { filteredRangeDeposites } = useFilterRangeDeposite(clients || [], range || [])

  const handlerRangeFilter = () => {
    setDisplayedСlients(filteredRangeDeposites)
  }

  const [searchQuery, setSearchQuery] = React.useState('')
  const handlerSearchQuery = (e) => setSearchQuery(e.target.value)

  const filteredClients = displayedСlients && displayedСlients.filter(client =>
    client.clientName.toLowerCase().trim().includes(searchQuery.toLowerCase().trim()));


  const handleSort = (event) => {
    setSort(event.target.value)
    if (event.target.value === 'zeroDeposite') setDisplayedСlients(filteredZeroDeposites)
    if (event.target.value === 'negativeDeposite') setDisplayedСlients(filteredNegativeDeposites)
    if (event.target.value === 'withoutCar') setDisplayedСlients(filteredWithoutCar)
    if (event.target.value === 'resetFilter') setDisplayedСlients(clients)
  }

  React.useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  React.useEffect(() => {
    setDisplayedСlients(clients);
  }, [clients]);

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
                <Paper sx={{
                  p: 2, mb: 4,
                  display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', alignItems: 'center',
                }}>
                  <TextField
                    sx={{ minWidth: 300 }}
                    id="outlined-basic"
                    label="Пошук за ПIБ або телефоном"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handlerSearchQuery}
                  />
                  <FormControl sx={{ minWidth: 200 }}>
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
                  <Box sx={{ width: 400, display: 'flex', mr: 4, ml: 2 }}>
                    <Box sx={{
                      width: 300, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',
                    }}>
                      <FormHelperText id="component-helper-text">
                        {`Фiльтр депозиту вiд: ${range[0]} до ${range[1]} грн`}
                      </FormHelperText>
                      <Slider
                        getAriaLabel={() => ''}
                        value={range}
                        onChange={handlerRange}
                        valueLabelDisplay="auto"
                        // getAriaValueText={valuetext}
                        defaultValue={200}
                        step={50}
                        name={'rangeSlider'}
                        marks
                        min={0}
                        max={1500}
                      />
                    </Box>
                    <Button
                      onClick={handlerRangeFilter}
                      variant="contained"
                      sx={{ ml: 4 }}
                    >
                      Сортувати
                    </Button>
                  </Box>

                  <Box sx={{
                    display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',
                  }}>
                    <IconButton
                      color="primary"
                      onClick={() => setDisplayedСlients(filteredNegativeDeposites)}
                    >
                      <Badge badgeContent={filteredNegativeDeposites.length} color="warning">
                        <NotificationsIcon />
                      </Badge>
                    </IconButton>
                    <FormHelperText>{`Заборгованостi`}</FormHelperText>
                  </Box>

                </Paper>
                {isLoading ? <CircularProgress /> : <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  {Array.isArray(filteredClients) && filteredClients.length > 0 ? <Orders clients={filteredClients} /> : 'Kористувачi вiдсутнi. Створiть нового'}
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