import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { NewsTopics } from '../config/api';
import { Link } from 'react-router-dom';
 

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
                     <a href={article.url}>
                    <img
                        style={{
                            width: 400,
                        }} 
                        src={article.urlToImage} alt="" 
                        />
                        <h3>{article.title}</h3>
                        <p>{article.description}</p>
                    </a>
                </div>
            })
        }
        </>
    )
}

export default Newsboard;

