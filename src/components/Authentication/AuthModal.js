import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { AppBar, Tabs, Tab } from '@mui/material';
import Login from './Login';
import Signup from './Signup';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <div>
      <Button 
        onClick={handleOpen}
        variant="contained"
        style={{
            width: 85,
            height: 40,
            marginLeft: 15,
            backgroundColor: "#EEBC1D",
        }}
        >Login</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
                <AppBar 
                position="static"
                style={{
                    backgroundColor: 'transparent', color: 'white'}}
                >
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant='fullWidth'
                        style={{ borderRadius: 10}}>
                        <Tab label='Login'/>
                        <Tab label='Sign Up'/>
                    </Tabs>
            </AppBar> 
                {value===0 && <Login handleClose={handleClose}/>}
                {value===1 && <Signup handleClose={handleClose}/>}
        </Box>
      </Modal>
    </div>
  );
}