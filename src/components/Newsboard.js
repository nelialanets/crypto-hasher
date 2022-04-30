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

 

const Newsboard = () => {
    const [news, setNews] = useState([]);

    const fetchNews =async () => {
        const { data }  = await axios.get(NewsTopics());

        setNews(data.articles);
    };

    useEffect(() => {
        fetchNews();
    }, []);

    return (
        <>
        {
            news.map((article) => {
                return<div>
                 <Card 
                 sx={{ flexGrow: 1 }}
                 container spacing={{ xs: 2, md: 3 }} 
                 sx={{ maxWidth:400, margin:5}}
                 
                 >
                     <Grid 
                     container spacing={{ xs: 2, md: 3 }} 
                     columns={{ xs: 4, sm: 8, md: 12 }}

                     >
                        <CardMedia 
                            component="img"
                            height="200"
                            image={article.urlToImage} 
                        />
                        <CardContent>
                        <Typography variant="h5" component="div"
                        sx={{
                            color:'black',
                            fontFamily:'Montserrat',
                        }}
                        >
                            {article.title}
                          </Typography>

                            <Typography variant="body2" color="text.secondary"
                            sx={{
                                fontFamily:'Montserrat',
                                margin:1
                            }}>
                            <a
                            href={article.url}>
                            {article.description} </a>
                            </Typography>
                        </CardContent>
                        </Grid>
                        
                 </Card>
                 
                </div>
            })
        }
        </>
    )
}

export default Newsboard;

