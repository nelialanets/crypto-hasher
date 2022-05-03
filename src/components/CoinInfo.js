import React, {useState, useEffect} from 'react'
import { HistoricalChart } from '../config/api';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import  CircularProgress  from '@mui/material/CircularProgress';
import {Line} from 'react-chartjs-2';
import SelectButton from '../components/SelectButton'
import { chartDays } from '../config/data';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    } from 'chart.js';
import { padding } from '@mui/system';
    
    ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
    );

const CoinInfo = ({coin}) => {
const [historicData, setHistoricData] = useState();
const [days, setDays] = useState(365);
const [flag, setflag] = useState(false);
const { currency } = CryptoState();

    const fetchHistoricData = async () => {
        const {data} = await axios.get(HistoricalChart(coin.id, days));
        setflag(true);
        setHistoricData(data.prices)
    };

    useEffect(() => {
        fetchHistoricData();
    },[days]);

    return (
            <div className='chart-container' >
                
                <div className='chart'
                >
            {!historicData | flag===false ? (
                <CircularProgress
                style={{ color: '#29D7B9'}}
                size={300}
                thickness={1}
                />
            ) : (
                <div>
                <Line

                    style={{
                        backgroundColor: "black",

                    }}
                    data={{
                        labels: historicData.map((coin) => {
                            let date = new Date(coin[0]);
                            let time =
                            date.getHours() > 12
                            ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                            : `${date.getHours()}:${date.getMinutes()} AM`;
                        return days === 1 ? time : date.toLocaleDateString();
                        }),          
                        datasets: [
                            {
                                data: historicData.map((coin) => coin[1]),
                                label: `Price ( Past ${days} Days ) in ${currency}`,
                                borderColor: "#29D7B9",
                            },
                        ],
                    }}
                        options={{
                            elements: {
                              point: {
                                radius: 1,
                              },
                            },
                          }}
                        />
                        <div style={{
                            display: "flex",
                             padding:'2%',
                            justifyContent: "space-around",
                            width: "100%",
                            backgroundColor:"#29D7B9"
                        }}>
                        {chartDays.map((day) => (
                            <SelectButton
                                key={day.value}
                                onClick={()=> setDays(day.value)}
                                selected={day.value === days}
                            >{day.label}</SelectButton>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            </div>
  );
};

export default CoinInfo