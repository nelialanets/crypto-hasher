import React from 'react'
import { useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import { MenuItem, Select, Toolbar, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CryptoState } from '../CryptoContext';
import UserSidebar from './UserSidebar';
import AuthModal from './Authentication/AuthModal';
import { flexbox } from '@mui/system';


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
        fontWeight:'300',
        marginBottom:15,
      }
      } >
        <Container
          sx={{
            height: 100,
            display: 'flex',
          }}
        >
          <Toolbar
          st={{
            display: 'flex',
            width:20
          }}>
            <Typography
              onClick={() => navigate("/")}
              sx={{
              display:'flex',
               marginLeft:-50,
               width:250,
               fontFamily:"large",
               fontSize:25,
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