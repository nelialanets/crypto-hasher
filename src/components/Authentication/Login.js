import { initializeApp } from "firebase/app";
import React from 'react'
import { useState } from 'react'
import { Box, TextField } from '@mui/material'
import Button from '@mui/material/Button';
import { CryptoState } from '../../CryptoContext'
import fireConfig from "../../config/fireConfig";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
  } from "firebase/auth";
  import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
  } from "firebase/firestore";

  const app = initializeApp(fireConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  const Login = ({handleClose}) => {
    const[email, setEmail] = useState(" ")
    const[password, setPassword] = useState(" ")

    const {setAlert} = CryptoState();

    const handleSubmit = async() => {
        if(!email || !password) {
            setAlert({
                open: true,
                message: "Please fill all the Fields",
                type: "error",
            });
            return;
        }
       try{

        const res = await signInWithEmailAndPassword (
            auth,
             email,
              password
              );
        setAlert({
            open: true,
            message: `Log In Successful. Wecome ${res.user.email}`,
            type: 'success',
        });
        // await signInWithEmailAndPassword(auth, email, password);
       
        handleClose();

       }catch (error){
           setAlert({
               open: true,
               message: error.message,
               type:'error',

           })
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
            backgroundColor: '#29D7B9',
            display: 'flex',
            m:5,
            
        }}
        onClick={handleSubmit}
    >Login</Button>
    </Box>
  );
};

export default Login