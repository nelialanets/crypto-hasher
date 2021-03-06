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
import { teal } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

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

    const theme = createTheme({
        palette: {
          primary: {
            main: teal[500],
          },
          secondary: {
            main: '#1de9b6',
          },
        },
    });

    const color = teal[500];
    return(
        <div className='coinTablemain'>
            <TextField
            label="Search For a Crypto Currency.." 
              color='primary'
              id="outlined-basic" 
              variant="outlined"
              focused
                sx={{
                    width:'40rem',
                    maxWidth: '100%',
                    margin: 10,
                    marginLeft:"35%",
                    marginTop:'10%',  
                }}
                    onChange={(e)=>setSearch(e.target.value)}
                />

                <TableContainer  component={Paper}>
                   {loading ? (
                           <LinearProgress style={{ backgroundColor: "green"}} />
                       ) : (
                        <Table aria-label="simple table"
                        sx={{
                            border:2,
                           borderBlockColor:'#29D7B9'
                        }}

                        >
                            <TableHead sx={{
                                color:'white',
                                backgroundColor:'#3d4542', 
                                border:2,
                                borderColor:'#29D7B9',
                            }}>
                                <TableRow
                                >
                                    {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                     <TableCell
                                        style={{
                                            color: "white",
                                            fontWeight: "500",
                                            fontFamily: "Montserrat",
                                            border:2,
                                            fontFamily:'large',
                                             fontSize:20,
                                             
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
                        sx={{color:'black',
                        backgroundColor:"#424353", 
                        border:1,
                        }}>
                            {handleSearch()
                            .slice((page - 1) * 10, (page - 1) * 10 + 10)
                            .map((row) => {
                            const profit = row.price_change_percentage_24 > 0;
                            return (
                                <TableRow className='row'
                                    onClick={() => navigate(`/coins/${row.id}`)}
                                    key={row.name}
                                    style={{
                                        backgroundColor:"#424353", 
                                        border:1,
                                    
                                    }}>

                                    <TableCell
                                        component='th' 
                                        scope='row'
                                        style={{
                                            display: "flex",
                                            gap: 15,
                                            borderColor:'#29D7B9',
                                            backgroundColor:'black',
                                            fontFamily: "Montserrat",
                                            fontFamily:'large',
                                            fontSize:20,
                                            
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
                                                    borderColor:'#29D7B9',
                                                    
                                                    
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        textTransform: "uppercase",
                                                        fontSize: 22,
                                                    }}
                                                >
                                                    {row.symbol}
                                                </span>
                                                <span
                                                    style={{
                                                        // color: "darkgrey",
                                                        // borderColor:'#29D7B9',
                                                        
                                                    }}
                                                >
                                                    {row.name}
                                                </span>
                                            </div>
                                    </TableCell>
                                    <TableCell 
                                        align="right" 
                                        
                                        sx={{
                                            borderColor:'#29D7B9',
                                            color:'white',
                                            backgroundColor:'black',
                                            fontFamily: "Montserrat",
                                            fontFamily:'large',
                                             fontSize:20
                                        }}>
                                        ${" "}
                                        {numberWithCommas(row.current_price.toFixed(2))}  
                                        
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                        style={{
                                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                            fontWeight: 500,
                                            borderColor:'#29D7B9',
                                            backgroundColor:'black',
                                            fontFamily: "Montserrat",
                                            fontFamily:'large',
                                            fontSize:20

                                        }}
                                        >
                                        {profit && "+"}
                                        {row.price_change_percentage_24h.toFixed(2)}%
                                        </TableCell>
                                        <TableCell 
                                            align="right"
                                            sx={{
                                                borderColor:'#29D7B9',
                                                color:'white',
                                                backgroundColor:'black',
                                                fontFamily: "Montserrat",
                                                fontFamily:'large',
                                                 fontSize:20
                                            }}
                                            >
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
                backgroundColor:'#29D7B9',
                 marginBottom:35,
                 marginTop:10
                }}
                onChange={(_, value) => {
                setPage(value);
                window.scroll(0, 450);
          }}
        />
        </div>
    )
}

