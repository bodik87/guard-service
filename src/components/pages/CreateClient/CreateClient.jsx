import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createClient } from '../../../store/client/clientSlice';
import { paths } from '../../../paths';
import Adress from '../../Adress/Adress'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Avatar, Button, Checkbox, CircularProgress, FormControlLabel, TextField } from '@mui/material';

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

  const { isLoading } = useSelector(state => state.client);
  const [isCar, setIsCar] = React.useState(true)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCreateClient = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      clientName: data.get('clientName'),
      street: data.get('street'),
      house: data.get('house'),
      apartment: data.get('apartment'),
      phoneNumber: data.get('phoneNumber'),
      isCar: isCar,
      carPlateNumber: data.get('carPlateNumber'),
      deposit: data.get('deposit'),
    };

    dispatch(createClient(formData)).then((res) => {
      if (!res.error) {
        navigate(`${paths.client}/${res.payload.id}`, { replace: true });
      }
    })
  }

  const handleIsCar = () => {
    setIsCar(!isCar)
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
            <Paper sx={{ p: 2, pb: 8, display: 'flex', flexDirection: 'column' }}>
              {
                isLoading ?
                  <CircularProgress /> :
                  <>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <PersonAddIcon />
                      </Avatar>
                      <Typography component="h1" variant="h5">
                        Створити користувача
                      </Typography>
                      <Box component="form" onSubmit={handleCreateClient} noValidate sx={{ mt: 1 }}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          name="clientName"
                          label="ПIБ"
                          type="text"
                          id="clientName"
                          autoFocus
                        />

                        <Adress />
                        <div>
                          <FormControlLabel
                            control={
                              <Checkbox
                                value="isCar"
                                color="primary"
                                checked={isCar}
                                onChange={handleIsCar}
                              />
                            }
                            label="Наявнiсть авто"
                          />
                          {
                            isCar && <TextField
                              margin="normal"
                              fullWidth
                              name="carPlateNumber"
                              label="Номер авто"
                              type="text"
                              id="carPlateNumber"
                            />
                          }
                        </div>

                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          name="phoneNumber"
                          label="Номер телефону"
                          type="phone"
                          id="phoneNumber"
                        />
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          name="deposit"
                          label="Залишок коштiв"
                          id="deposit"
                        />

                        <Button
                          type="submit"
                          // onClick={handleSubmit}
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Створити
                        </Button>
                      </Box>
                    </Box>
                  </>
              }
            </Paper>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider >
  );
}

export default function CreateClient() {
  return <DashboardContent />;
}