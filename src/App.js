import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Grid, Paper, ThemeProvider, createTheme, CssBaseline, Fab } from '@mui/material';
import { styled } from '@mui/system';
import { UserProvider } from './api/User';
import UserList from './UserList';
import UserDetails from './UserDetails';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
});

const ContainerWrapper = styled(Container)({
  marginTop: 16,
});

function App() {
  const [themeMode, setThemeMode] = useState('dark');

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };


  return (
    <ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
      <CssBaseline />
      <Router>
        <UserProvider>
          <ContainerWrapper>
            <Grid container justifyContent="center">
              <Grid item xs={12} md={8}>
                <Paper>
                  <Routes>
                    <Route path="/" element={<UserList />} />
                    <Route path="/user/:username" element={<UserDetails />} />
                  </Routes>
                </Paper>
              </Grid>
            </Grid>
          </ContainerWrapper>
        </UserProvider>
      </Router>
      <Fab
        onClick={toggleTheme}
        style={{ position: 'fixed', bottom: 16, right: 16 }}
        color="primary"
        aria-label="toggle theme"
      >
        {themeMode === 'light' ? <Brightness4 /> : <Brightness7 />}
      </Fab>
    </ThemeProvider>
  );
}

export default App;
