import React from 'react'
import { useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import { MenuItem, Select, Toolbar, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CryptoState } from '../CryptoContext';
import UserSidebar from './UserSidebar';
import AuthModal from './Authentication/AuthModal';
import { flexbox, width } from '@mui/system';


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
        backgroundColor:"black",
        direction:'flex',
        marginBottom:15,
        width:'100%'
      }
      } >
        <Container
          sx={{
            height: 100,
            display: 'flex',
            marginLeft:'6%',
            width:"100%"
          }}
        >
          <Toolbar
          st={{
            display: 'flex',
          }}>
            <Typography
              onClick={() => navigate("/")}
              sx={{
              display:'flex',
               width:"15rem",
               fontFamily:"large",
               fontSize:'1.5rem',
               color:'#29D7B9',

              }}
            >CRYPTO-HASHER
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