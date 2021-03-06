import { initializeApp } from "firebase/app";
import React from 'react'
import { useState } from 'react'
import { Box } from '@mui/system';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { CryptoState } from '../../CryptoContext'
import  {auth, createUserWithEmailAndPassword}  from '../../firebase';
import {
    getFirestore,
    collection,
    addDoc,
  } from "firebase/firestore";
import fireConfig from "../../config/fireConfig";
    
  const app = initializeApp(fireConfig);
  const db = getFirestore(app);

const Signup = ({handleClose}) => {

    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[confirmPassword, setConfirmPassword] = useState("")

    const { setAlert } = CryptoState();

    const handleSubmit = async () => {
        if(password !== confirmPassword) {
            setAlert({
                open: true,
                message: 'Passwords do not match',
                type: 'error'
            });
            return;     
        }

        try {
            const res = await 
            createUserWithEmailAndPassword(
                auth,
                email, 
                password,
                );
                const user = res.user;
                await addDoc(collection(db, "users"), {
                  uid: user.uid,
                  password,
                  authProvider: "local",
                  email,    
                });

                console.log(res);

                setAlert({
                    open: true,
                    message: `Sign Up Successful. Wecome ${res.user.email}`,
                    type: 'success'
                });
            handleClose();
        } catch (error) {
            setAlert({
                open: true,
                message: error.message,
                type: 'error',
            });
            return;
            }
        };
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
    <TextField 
        variant='outlined'
        type='password'
        label="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
    />
    <Button 
        variant='contained'
        size='large'
        style={{ backgroundColor: '#29D7B9' }}
        onClick={handleSubmit}
    >
            Sign-Up
        </Button>
    </Box>
    );
};

export default Signup;