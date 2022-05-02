import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { NewsTopics } from '../config/api';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { fontFamily } from '@mui/system';
import Grid from '@mui/material/Grid';
import'../styles/News.css'

 

const Newsboard = () => {
    const [news, setNews] = useState([]);

    const fetchNews = async () => {
        const { data }  = await axios.get(NewsTopics());
        setNews(data.data);

    };

  
    useEffect(() => {
        fetchNews();
    }, []);


    return (
    
        <div className='main-container'>
            <h1 className='newsFeed'> NEWS FEED</h1>
        {
            news.map((data) => {
                return<div  className='card'>
                 <Card >
                        <CardMedia 
                            component="img"
                            height="200"
                            image={data.image_url} 
                        />
                        <CardContent>
                        <Typography variant="h5" component="div"
                        sx={{
                            color:'black',
                            fontFamily:'Montserrat',
                        }}
                        > <a
                            href={data.news_url}>
                            {data.title}
                            </a>
                          </Typography>

                            <Typography variant="body2" color="text.secondary"
                            sx={{
                                fontFamily:'Montserrat',
                                margin:1
                            }}>
                            <a
                            href={data.news_url}>
                            {data.title} </a>
                            </Typography>
                        </CardContent>
                 </Card>
                 
                </div>
            })
        }
        </div>
    )
}

export default Newsboard;

