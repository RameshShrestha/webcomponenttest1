import React, { useEffect, useState } from 'react';
import ArticleCard from './ArticleCard';
import { Button, Title } from '@ui5/webcomponents-react';



const ArticleCardContainer = () => {
  const [articleData, setArticleData] = useState({ results: [] });
  const fetchNews = async (nextPageCode) => {
    //   const baseURL = process.env.REACT_APP_SERVER_URI;
    const baseURL = "MyDataprovider";
    let newsURL = baseURL + "/newsapi";
    if (nextPageCode.length > 0) {
      newsURL = newsURL + '?&page=' + nextPageCode;
    }
    try {
      const response = await fetch(newsURL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      if (nextPageCode) {
        result.results = [...articleData.results, ...result.results];
        setArticleData(result);
      } else {
        setArticleData(result);
      }

    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {

    fetchNews("");

  }, []);
  return (
    <>
      <Title style={{fontSize: "4rem",    color: "#242439"}}>Latest News India from NewsData.io</Title>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
        {articleData.results.map(article => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </div>
      <button className='nextNewsButton' onClick={(e) => {
        let nextPageCode = articleData.nextPage;
        if (nextPageCode) {
          fetchNews(nextPageCode);
        }

      }}>Next Page</button>
    </>
  );
};

export default ArticleCardContainer;