import React from 'react'
import { useState } from 'react'
import { Box, TextField } from '@mui/material'
import Button from '@mui/material/Button';
import { CryptoState } from '../../CryptoContext'

const 
Login = ({handleClose}) => {
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")

    const {setAlert} = CryptoState();

    const handleSubmit = () => {
        if(!email || !password) {
            setAlert({
                open: true,
                message: "Please fill all the Fields",
                type: "error",
            });
            return;
        }
    }
  
    return (
    <Box 
        p={3}
        style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
        }}
    >
    <TextField 
        variant='outlined'
        type='email'
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
    />    
    <TextField 
        variant='outlined'
        type='password'
        label="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
    />    
    <Button 
        variant='contained'
        size='large'
        style={{
            backgroundColor: '#EEBC1D'
        }}
        onClick={handleSubmit}
    >Login</Button>
    </Box>
  );
};

export default Login