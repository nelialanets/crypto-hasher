import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../config/api';
import {CryptoState} from "../CryptoContext"
import CoinInfo from '../components/CoinInfo';
import "../styles/Sidebar.css"
import { Typography, LinearProgress } from '@mui/material';
import parse from 'html-react-parser';

  export function numberWithCommas(x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

const CoinsPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const {currency, symbol} = CryptoState();


  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  }

  useEffect(() =>{
    fetchCoin();
  },[])

  console.log(coin);

if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <div>
      <div className='sidebar'>
        <img
        src={coin?.image.large}
        alt={coin?.name}
        height="200"
        style={{ marginBottom: 20}}
        />
        <Typography variant="h3" className='heading'>
          {coin?.name}
        </Typography>

        <Typography variant="subtitle1" className='description'>
          {parse(coin?.description.en.split(". ")[0])}.
        </Typography>

        <div>
          <span style={{display: "flex"}}>
            <Typography variant='h5' className='heading'>
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