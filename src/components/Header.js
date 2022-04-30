import React from 'react'
import { useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import { MenuItem, Select, Toolbar, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CryptoState } from '../CryptoContext';
import UserSidebar from './UserSidebar';
import AuthModal from './Authentication/AuthModal';
import { fontWeight } from '@mui/system';


const darkTheme = createTheme({
  palette: { 
    mode: 'dark',
  },
});

const Header = () => {
const {currency, setCurrency, user} = CryptoState();
 
const navigate = useNavigate();

  return (
    <>
      <ThemeProvider theme={darkTheme}>
      <AppBar  position='static'
      sx={{
        backgroundColor:"#424353",
        direction:'flex',
        color:"#29D7B9",
        fontWeight:'300',
      }

      } >
        <Container
          sx={{
            height: 100,
            display: 'flex',

          }}
        >
          <Toolbar>
            <Typography
              onClick={() => navigate("/")}
              variant="h6"
              
              sx={{
                m:-11,
                display: 'flex',
                marginLeft: -50,
                height: 2,

              }}
            >Crypto-Hasher
            </Typography>

              {user ? <UserSidebar /> : <AuthModal />}

          </Toolbar>
        </Container>
    </AppBar>
    </ThemeProvider>
    </>
  )
}


export default Header