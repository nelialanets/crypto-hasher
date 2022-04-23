import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import { MenuItem, Select, Toolbar, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CryptoState } from '../CryptoContext';
import UserSidebar from './UserSidebar';
import AuthModal from './Authentication/AuthModal';


const darkTheme = createTheme({
  palette: { 
    mode: 'dark',
  },
});

const Header = () => {
const {currency, setCurrency} = CryptoState();
 
const navigate = useNavigate();

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position='static'>
        <Container>
          <Toolbar>
            <Typography
              onClick={() => navigate("/cryptopage")}
              variant="h6"
            >Crypto-Hasher
            </Typography>
              <Select 
                variant="outlined"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currency}
                style={{ width: 100, height: 40, marginLeft: 15 }}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <MenuItem>USD</MenuItem>
                <MenuItem>SNAILS</MenuItem>
              </Select>
              <AuthModal />
              {/* <UserSidebar /> */}
          </Toolbar>
        </Container>
    </AppBar>
    </ThemeProvider>
    </div>
  )
}


export default Header