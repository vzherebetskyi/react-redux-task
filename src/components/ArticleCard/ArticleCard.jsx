import React from 'react';
import moment from 'moment';

import './ArticleCard.scss';
import ImagePlaceholder from '../../assets/images/placeholder-image.webp';

const ArticleCard = ({ article }) => (
    <div className='card-wrapper' onClick={() => window.open(article.url,'_blank')}>
      <p className='card-title'>{article.title}</p>
      <div className='card-image-container'>
        <img src={article.urlToImage ? article.urlToImage : ImagePlaceholder} className='card-image' />
      </div>
      <div className='card-info-container'>
        <div className='card-info-container__author'>
          <p><span>Author:</span> {article.author}</p>
        </div>
        <div className='card-info-container__published'>
          <p><span>Published:</span> {moment(article.publishedAt).format('Do MMMM YYYY')}</p>
        </div>
        <div className='card-info-container__source'>
          <p><span>Source:</span> {article.source}</p>
        </div>
      </div>
      <div className='card-description-container'>
        <p className='card-description-text'>{article.content}</p>
        <p><strong>API:</strong> {article.api}</p>
      </div>
    </div>
  );

export default ArticleCard;
