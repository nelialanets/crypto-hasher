import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../config/api';
import {CryptoState} from "../CryptoContext"
import CoinInfo from '../components/CoinInfo';
import Banner from '../components/Banner/Banner';
import "../styles/Sidebar.css"
import { Typography, LinearProgress, Button } from '@mui/material';
import parse from 'html-react-parser';
import { setDoc } from 'firebase/firestore';
import {db} from '../firebase'
import { doc } from 'firebase/firestore';

  export function numberWithCommas(x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

const CoinsPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const {currency, symbol, user, watchlist, setAlert} = CryptoState();


  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  }

  const inWatchList = watchlist.includes(coin?.id);

  const addToWatchlist= async()=>{
    const coinRef = doc(db, "watchlist", user.uid);
    
    try{
      await setDoc(
        coinRef,
        {coins: watchlist ? [...watchlist, coin.id] : [coin?.id] },
        { merge: true }
        );

        setAlert({
          open:true,
          message:`${coin.name} Added to the Watchlist!`,
          type:'success'
        });
    }catch (error){
      setAlert({
        open:true,
        message: error.message,
        type:'error'
      });
    }
  };

  const removeFromWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((wish) => wish !== coin?.id) },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} Removed from the Watchlist!`,
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


  // console.log()

  useEffect(() =>{
    fetchCoin();
  },[])

if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <div className='container'
    style={{
      width:'100%',
      display:'flex',
      flexDirection:'column',
    }}
    >
      <div className='sidebar'
        sx={{
          width:'100%',
          display:'flex',
          flexDirection:'column',
          marginTop:25,
          borderRight:1,
          marginRight:'80rem',
        }}
      >
        <img
        src={coin?.image.large}
        alt={coin?.name}
        height="200"
        style={{
          marginBottom: 20,
          display:'flex',
          marginRight:'80rem',

        }}/>
        <Typography 
          variant="h3" 
          className='heading'
          style={{
            fontWeight:'bold',
             fontFamily:'Montserrat',
             marginBottom:'1%',
             fontSize:"400%",
             marginRight:'80rem',
          }}
          >
          {coin?.name}
        </Typography>

        <Typography 
          variant="subtitle1" 
          className='description'
          sx={{
            width:'40rem',
            fontFamily:'Montserrat',
            paddingTop:0,
            fontSize:"100%",
            marginRight:'55rem',
          }}>
          <hr></hr>
          {parse(coin?.description.en.split(". ")[0])}.
        </Typography>

        <div style={{
          marginBottom:"5%"
          }} >
        <span style={{display: "flex",
          width:'5rem',
          marginRight:'90rem',
          marginTop: "1%",
        }}>
            <Typography 
              variant='h5' 
              className='heading'
              sx={{
                fontSize: '100',
              }}
              >
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant='h5' className='heading'>
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
            </span>
            <span style={{display: "flex"}}>
            <Typography variant='h5' className='heading'>
              Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant='h5' className='heading'>
            {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
            </span>

            <span style={{display: "flex"}}>
            <Typography variant='h5' className='heading'>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant='h5' className='heading'>
            {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}M
            </Typography>
            </span>
            {user && (
              <Button
              variant='outlined'
              style={{
                width:'20%',
               height:40,
               padding:'5px',
               margin:'20px',
               backgroundColor: inWatchList ? '#ff0000' : 'green',
               color: 'black'
              }}
              onClick={inWatchList ? removeFromWatchlist : addToWatchlist}
              >
              {inWatchList ? "Remove from Watch":'Add to Watchlist'} 
            </Button>
            )}
        </div>
      </div>
      <div>
        {/* {chart} */}
        <CoinInfo coin={coin} />
      </div>
    </div>
  )
}

export default CoinsPage