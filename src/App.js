import { Link } from 'react-router-dom';
import './App.css';
import MyRouter from './router';
import { useState } from 'react';
import { Box, Container, CssBaseline, List, ListItem, ListItemIcon, ListItemText, Switch, ThemeProvider, createTheme } from '@mui/material';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import MenuAppBar from './components/MenuAppBar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {
  const [mode, setMode] = useState('light')

  const customTheme = createTheme({
      palette: {
          mode: mode,
      },
  })

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline>
        <MenuAppBar />
        <Container>
          <Box>
            <List>
              <ListItem>
                  <ListItemIcon>
                      <Brightness3Icon />
                  </ListItemIcon>
                  <Switch onChange={(e) => setMode(mode === 'light' ? 'dark' : 'light')} />
                  <ListItemText primary='Switch Theme'/>
              </ListItem>
            </List>
          </Box>
        </Container>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MyRouter />
        </LocalizationProvider>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
