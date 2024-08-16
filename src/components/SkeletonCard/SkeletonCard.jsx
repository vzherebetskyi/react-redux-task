import React from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import './SkeletonCard.scss';

const SkeletonCard = () => (
    <div className='card-wrapper'>
      <p className='card-title'><Skeleton /></p>
        <Skeleton height={100} />
      <div className='card-info-container'>
        <div className='card-info-container__author'>
          <p><Skeleton /></p>
        </div>
        <div className='card-info-container__published'>
          <p><Skeleton /></p>
        </div>
        <div className='card-info-container__source'>
          <p><Skeleton /></p>
        </div>
      </div>
      <div className='card-description-container'>
        <p><Skeleton count={3} /></p>
        <p><Skeleton /></p>
      </div>
    </div>
  );

export default SkeletonCard;
