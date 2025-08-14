import React from 'react';

const ArticleCard = ({ article }) => {
  // Truncate description to 200 characters
  const getShortDescription = (desc) => {
    if (!desc) return '';
    return desc.length > 200 ? desc.slice(0, 200) + '...' : desc;
  };

  return (
    <div className='article-card'>
      <h2>{article.title}</h2>
      <img
        src={article.image_url || '/noimage.jpg'}
        alt='No Image Available'
        onerror="this.onerror=null;this.src='noimage.jpg';"
        style={{ width: '100%', maxHeight:'200px', borderRadius: '8px', marginBottom: '10px' }}
      />
      <p><strong>By:</strong> {article.creator && article.creator.join(', ')}</p>
      <p><strong>Description:</strong> {getShortDescription(article.description)}</p>
      <p><strong>Published:</strong> {article.pubDate} ({article.pubDateTZ})</p>
      <p><strong>Source:</strong> <img src={article.source_icon} alt="icon" style={{width: 20, verticalAlign: 'middle'}} /> {article.source_name}</p>
      <p><strong>Language:</strong> {article.language}</p>
      <a href={article.link} target="_blank" rel="noopener noreferrer" style={{color: '#a786df'}}>Read Full Article</a>
    </div>
  );
};

export default ArticleCard;