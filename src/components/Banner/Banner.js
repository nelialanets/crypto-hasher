import React from 'react'
import { Container, Typography,TextField, Paper, } from '@mui/material'
import { display } from '@mui/system'




const Banner = () => {
  
    return (
    <div className='banner'>
    <Container 
    >
        <Typography
                variant='h4'
                sx={{ m: 10,
                    display:'flex',
                     fontFamily: "Montserrat",
                     alignItems:'center',
                     justifyContent:'center',
                      color:'white'}}
            >
                {/* Cryptocurrency Prices by Market Cap */}
            </Typography>

    </Container>

    </div>
  )
}

export default Banner