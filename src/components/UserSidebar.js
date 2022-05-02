import * as React from 'react';
import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import { CryptoState } from '../CryptoContext';
import { Avatar } from '@mui/material';
import { Button } from '@mui/material';
import { signOut } from 'firebase/auth';
import {auth} from '../firebase';
import  {AiFillDelete}  from 'react-icons/ai'
import { setDoc, doc } from 'firebase/firestore';
import {db} from '../firebase'
import '../styles/SideMenu.css'

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(d{3})+(?!\d))/g, ",")
}

export default function UserSidebar() {
  const [coin, setCoin] = useState();
  const [state, setState] = React.useState({
    right: false,
  });

const {user, setAlert, watchlist, coins, symbol} = CryptoState();


  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')
    
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logOut = () => {
    signOut(auth);
    setAlert({
      open: true,
      type: "success",
      message: "Logout Successfull!",
    });

    toggleDrawer();
  };

  const removeFromWatchlist = async (coin) => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((watch) => watch !== coin?.id) },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin} Removed from the Watchlist!`,
        type: "success",
      });

    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };
  // console.log(watchlist)

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
            <Avatar 
                onClick={toggleDrawer(anchor, true)}
                sx={{
                    height: 38,
                    width: 38,
                    marginLeft: '70rem',
                    cursor: "pointer",
                    backgroundColor: "#29D7B9",
                }}
                src={user.photoURL}
                alt={user.displayName || user.email}
            />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
              <div 
                className='container'
                style={{
                  width: 350,
                  padding: 25,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  fontFamily: "monospace",
                }}>
              <div 
                className='profile'
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "20px",
                  height: "92%",
                }}>
                   <h1  className='h1-hasher'>
                    CRYPTO-HASHER WATCHLIST</h1>
              <Avatar 
                sx={{
                    height: 100,
                    width: 100,
                    margin: 10,
                    marginBottom: 2, 
                    cursor: "pointer",
                    backgroundColor: "#29D7B9",
                    }}
                    src={user.photoURL}
                    alt={user.displayName || user.email}
                />
                
            <span
                style={{
                    width: "100%",
                    fontSize: 25,
                    textAlign: "center",
                    fontWeight: "bolder",
                    wordWrap: "break-word",
                }}
            >
                {user.displayName || user.email}
            </span>
            <div className="watchList"
            style={{
              flex:1,
              width:'100%',
              backgroundColor:'grey',
              borderRadius:10,
              padding:15,
              paddingTop:10,
              display:'flex',
              flexDirection:'colum',
              alignItems:'center',
              gap:12,
              overflowY:'scroll',
            }}>
              <span 
              style={{
                fontSize: 15, 
                textShadow: '0  0 5px black', 
              }}>
              </span>
              {watchlist.map((coin) => {
                    if (watchlist.includes(coin))
                      return (
                        <div className='listBar'>
                          <span className='list'
                          
                          >{coin}</span>
                          <span 
                            >
                            {symbol}{" "}
                            {numberWithCommas(coins)}
                            <AiFillDelete
                              style={{ cursor: "pointer" }}
                              fontSize="16"
                              onClick={() => removeFromWatchlist(coin)}
                            />
                          </span>

                        </div>
                      );
                    else return <></>;
                  })}
                </div>
              </div>
            <Button
                onClick={logOut}
                sx={{
                  height: 50,
                  padding: '5px',
                  margin: '10px',
                  backgroundColor: '#29D7B9',
                  color: 'black',
                  fontSize: 'midium',
                  fontWeight: 'bold',
                  }}>
                Log Out
            </Button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};