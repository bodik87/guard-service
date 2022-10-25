import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteClient, getClient, resetClientPage } from '../../../store/client/clientSlice';
import { paths } from '../../../paths';
import { Copyright } from '@mui/icons-material';
import { Button, CircularProgress, CssBaseline, Paper, Toolbar } from '@mui/material';
import { Box, Container } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';


export const СlientPage = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { client, isLoading } = useSelector(state => state.client);

  React.useEffect(() => {
    dispatch(getClient(id));
  }, [dispatch, id]);

  const mdTheme = createTheme({
    palette: {
      primary: {
        main: '#d32f2f',
      },
      secondary: {
        main: green[500],
      },
    },
  });

  const handleClickBack = () => {
    navigate(-1)
    dispatch(resetClientPage())
  }

  const handleClickDelete = () => {
    dispatch(deleteClient(id)).then(res => {
      if (!res.error) {
        navigate(paths.home);
      }
    })
  }

  return (
    <>
      {
        client &&
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
                {
                  isLoading ?
                    <CircularProgress /> :
                    <>
                      <Button
                        onClick={handleClickBack}
                        sx={{ mt: 3, mb: 2 }}
                      >
                        На головну
                      </Button>
                      <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                        {client.clientName}
                        <EditIcon style={{ cursor: 'pointer' }} />
                      </Paper>
                      <Button
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleClickDelete}
                      >
                        Видалити користувача
                      </Button>
                    </>
                }
                <Copyright sx={{ pt: 4 }} />
              </Container>
            </Box>
          </Box>
        </ThemeProvider >
      }
    </>

  )
}