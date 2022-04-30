import { 
    LinearProgress, 
    TextField, 
    Typography,
    Paper,
} from '@mui/material';
import { Pagination } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import '../styles/CoinTable.css'

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

export default function CoinsTable(){
const [coins, setCoins] = useState([]);
const [loading, setLoading] = useState(false);
const [search, setSearch] = useState('');
const [page, setPage] = useState(1);


const navigate = useNavigate();

const { currency } = CryptoState();

const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency)) 
    setCoins(data);
    setLoading(false);
}
useEffect(() => {
    fetchCoins() 
}, [currency])
 
    const handleSearch = () => {
        return coins.filter(
            (coin) => 
                coin.name.toLowerCase().includes(search) || 
                coin.symbol.toLowerCase().includes(search)
        );
    };

    return(
        <div>
            <Typography
                variant='h4'
                sx={{ m: 10,
                    display:'flex',
                     fontFamily: "Montserrat",
                     alignItems:'center',
                     justifyContent:'center',
                      color:'white'}}
            >
                Cryptocurrency Prices by Market Cap
            </Typography>
            <TextField
                label="Search For a Crypto Currency.." 
                variant='outlined'
                    style={{ marginBottom: 20, with: "100%"}}

                    onChange={(e)=>setSearch(e.target.value)}
                />
                <TableContainer  component={Paper}>
                   {loading ? (
                           <LinearProgress style={{ backgroundColor: "green"}} />
                       ) : (
                        <Table aria-label="simple table">
                            <TableHead sx={{
                                color:'white',
                                backgroundColor:'black', opacity: 0.6
                            }}>
                                <TableRow 
                                >
                                    {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                     <TableCell
                                        style={{
                                            color: "white",
                                            fontWeight: "700",
                                            fontFamily: "Montserrat",
                                        }}
                                        key={head}
                                        align={head === "Coin" ? "" : "right"}
                                     >
                                        {head}
                                     </TableCell>   
                                    ))}
                                </TableRow>
                            </TableHead>

                        <TableBody className='row'
                        sx={{color:'white'}}>
                            {handleSearch()
                            .slice((page - 1) * 10, (page - 1) * 10 + 10)
                            .map((row) => {
                            const profit = row.price_change_percentage_24 > 0;
                            return (
                                <TableRow className='row'
                                    onClick={() => navigate(`/coins/${row.id}`)}
                                    key={row.name}
                                    style={{backgroundColor:"#424353", 
                                    
                                    }}>

                                    <TableCell
                                        component='th' 
                                        scope='row'
                                        style={{
                                            display: "flex",
                                            gap: 15,
                                            
                                        }}
                                            >
                                            <img
                                                src={row?.image}
                                                alt={row.name}
                                                height="50"
                                                style={{ marginBottom: 10}}
                                            />
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        textTransform: "uppercase",
                                                        fontSize: 22,
                                                        color:'white'
                                                    }}
                                                >
                                                    {row.symbol}
                                                </span>
                                                <span
                                                    style={{
                                                        color: "darkgrey",
                                                    }}
                                                >
                                                    {row.name}
                                                </span>
                                            </div>
                                    </TableCell>
                                    <TableCell 
                                        align="right">
                                        ${" "}
                                        {numberWithCommas(row.current_price.toFixed(2))}  
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                        style={{
                                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                            fontWeight: 500,

                                        }}
                                        >
                                        {profit && "+"}
                                        {row.price_change_percentage_24h.toFixed(2)}%
                                        </TableCell>
                                        <TableCell 
                                            align="right">
                                            ${" "}
                                            {numberWithCommas(row.market_cap.toString().slice(0, -6)
                                        )}
                                        M
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                        </TableBody>
                    </Table> 
                    )} 
                </TableContainer>
                <Pagination
                count={parseInt(handleSearch()?.length / 10).toFixed(0)}
                style={{
                padding: 20,
                width: "100%",
                display: "flex",
                justifyContent: "center",
                }}
                onChange={(_, value) => {
                setPage(value);
                window.scroll(0, 450);
          }}
        />
        </div>
    )
}

