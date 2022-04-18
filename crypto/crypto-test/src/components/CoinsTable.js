import axios from 'axios';
import { useEffect } from 'react'
import { useState } from 'react';
import { CoinList } from '../config/api';

// const useStyles = makeStyles({
//     row: {
//         backgroundColor: "#16171a",
//         cursor: "pointer",
//         "&:hover": {
//           backgroundColor: "#131111",
//         },
//         fontFamily: "Montserrat",
//       },
//       pagination: {
//         "& .MuiPaginationItem-root": {
//           color: "gold",
//         },
//       },
//     });

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

export default function CoinsTable(){
const [coins, setCoins] = useState([]);
const fetchCoins = async () => {
    const { data } = await axios.get(CoinList()) 
    setCoins(data);
}
useEffect(() => {
    fetchCoins() 
}, [])

  console.log(coins)

    return(
        "hello world"
    )
}

