import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';

import Layout from '../../components/layouts/base';
import './ArticlesList.scss';
import { getNewsAPINews, getGuardianAPINews, getNYTAPINews } from '../../services';
import { convertArticlesDataToUnifiedFormat } from '../../utils/helpers';
import { APITypes } from '../../utils/constants';
import { addArticles } from '../../redux/actions/articlesActions';
import ArticleCard from '../../components/ArticleCard/ArticleCard';
import SkeletonCard from '../../components/SkeletonCard/SkeletonCard';
import FilterBlock from '../../components/FilterBlock/FilterBlock';

const ArticlesList = () => {
  const articles = useSelector((state) => state.articlesReducer.articles);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
     getNews();
  }, []);

  const getNews = async () => {
    setIsLoading(true);
    try {
      const newsArticles = await Promise.allSettled([getNewsAPINews(), getGuardianAPINews(), getNYTAPINews()]);
      const unifiedNewsApiArticles = convertArticlesDataToUnifiedFormat(newsArticles[0].value ? newsArticles[0].value.articles : [], APITypes[0]);
      const unifiedGuardianApiArticles = convertArticlesDataToUnifiedFormat(newsArticles[1].value ? newsArticles[1].value.articles : [], APITypes[1]);
      const unifiedNYTApiArticles = convertArticlesDataToUnifiedFormat(newsArticles[2].value ? newsArticles[2].value.articles : [], APITypes[2]);

      dispatch(addArticles([...unifiedNewsApiArticles, ...unifiedGuardianApiArticles, ...unifiedNYTApiArticles]));
    } catch (e) {
      toast.error(e.error);
    }
    setIsLoading(false);
  }

  return (
    <Layout>
      <FilterBlock />
      <div className="articles-wrapper">
        {isLoading ? [...Array(5).keys()].map((el, idx) => <SkeletonCard key={`skeleton-${idx}`} />) : articles.length > 0 ? articles.map((article, idx) => <ArticleCard key={`${article.api}-${idx}`} article={article} />) : <p>No articles found</p>}
      </div>
    </Layout>
  );
}

export default ArticlesList;
