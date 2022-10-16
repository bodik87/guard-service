import { Copyright } from '@mui/icons-material';
import { Button, CssBaseline, Paper, Toolbar } from '@mui/material';
import { Box, Container } from '@mui/system';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getClient, resetClientPage } from '../../../store/client/clientSlice';
import { green, purple } from '@mui/material/colors';


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
                <Button
                  onClick={handleClickBack}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Назад
                </Button>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  {client.clientName}
                </Paper>
                <Copyright sx={{ pt: 4 }} />
              </Container>
            </Box>
          </Box>
        </ThemeProvider >
      }
    </>

  )
}