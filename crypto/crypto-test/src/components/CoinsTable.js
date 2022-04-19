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

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

export default function CoinsTable(){
const [coins, setCoins] = useState([]);
const [loading, setLoading] = useState(false);
const [search, setSearch] = useState("");
const [page, setPage] = useState(1);


const history = useNavigate();

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

  console.log(coins)
 
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
                style={{ margin: 18, fontFamily: "Montserrat"}}
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
                           <LinearProgress style={{ backgroundColor: "gold"}} />
                       ) : (
                        <Table aria-label="simple table">
                            <TableHead style={{ backgroundColor: "#EEBC1D"}}>
                                <TableRow>
                                    {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                     <TableCell
                                        style={{
                                            color: "black",
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

                        <TableBody>
                            {handleSearch()
                            .slice((page - 1) * 10, (page - 1) * 10 + 10)
                            .map((row) => {
                            const profit = row.price_change_percentage_24 > 0;
                            return (
                                <TableRow 
                                    onClick={() => history.push(`/coins/${row.id}`)}
                                    key={row.name}
                                >
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
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                        </TableBody>
                    </Table> 
                    )} 
                </TableContainer>
        </div>
    )
}
