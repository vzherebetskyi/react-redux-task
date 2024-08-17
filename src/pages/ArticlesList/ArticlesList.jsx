import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';

import Layout from '../../components/layouts/base';
import './ArticlesList.scss';
import { getNewsAPINews, getGuardianAPINews, getNYTAPINews } from '../../services';
import { convertArticlesDataToUnifiedFormat } from '../../utils/helpers';
import { APITypes } from '../../utils/constants';
import { addArticles, purgeArticles } from '../../redux/actions/articlesActions';
import { updateFilters } from '../../redux/actions/filtersActions';
import ArticleCard from '../../components/ArticleCard/ArticleCard';
import SkeletonCard from '../../components/SkeletonCard/SkeletonCard';
import FilterBlock from '../../components/FilterBlock/FilterBlock';

const ArticlesList = () => {
  const articles = useSelector((state) => state.articlesReducer.filteredArticles);
  const searchValue = useSelector((state) => state.filtersReducer.searchValue);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getNews();
  }, []);

  useEffect(() => {
    dispatch(purgeArticles());
    getNews(searchValue);
  }, [searchValue]);

  const getNews = async (searchValue) => {
    setIsLoading(true);
    try {
      const newsArticles = await Promise.allSettled([
        getNewsAPINews(searchValue),
        getGuardianAPINews(searchValue),
        getNYTAPINews(searchValue),
      ]);
      const unifiedNewsApiArticles = convertArticlesDataToUnifiedFormat(
        newsArticles[0].value ? newsArticles[0].value.articles : [],
        APITypes[0],
      );
      const unifiedGuardianApiArticles = convertArticlesDataToUnifiedFormat(
        newsArticles[1].value ? newsArticles[1].value.articles : [],
        APITypes[1],
      );
      const unifiedNYTApiArticles = convertArticlesDataToUnifiedFormat(
        newsArticles[2].value ? newsArticles[2].value.articles : [],
        APITypes[2],
      );

      const unifiedFiltersData = {
        date: [
          ...new Set([
            ...unifiedNewsApiArticles[1].date.filter((el) => el),
            ...unifiedGuardianApiArticles[1].date.filter((el) => el),
            ...unifiedNYTApiArticles[1].date.filter((el) => el),
          ]),
        ],
        category: [
          ...new Set([
            ...unifiedNewsApiArticles[1].category.filter((el) => el),
            ...unifiedGuardianApiArticles[1].category.filter((el) => el),
            ...unifiedNYTApiArticles[1].category.filter((el) => el),
          ]),
        ],
        source: [
          ...new Set([
            ...unifiedNewsApiArticles[1].source.filter((el) => el),
            ...unifiedGuardianApiArticles[1].source.filter((el) => el),
            ...unifiedNYTApiArticles[1].source.filter((el) => el),
          ]),
        ],
      };

      dispatch(
        addArticles([...unifiedNewsApiArticles[0], ...unifiedGuardianApiArticles[0], ...unifiedNYTApiArticles[0]]),
      );
      dispatch(updateFilters(unifiedFiltersData));
    } catch (e) {
      toast.error(e.error);
    }
    setIsLoading(false);
  };

  return (
    <Layout>
      <FilterBlock />
      <div className="articles-wrapper">
        {isLoading ? (
          [...Array(5).keys()].map((el, idx) => <SkeletonCard key={`skeleton-${idx}`} />)
        ) : articles.length > 0 ? (
          articles.map((article, idx) => <ArticleCard key={`${article.api}-${idx}`} article={article} />)
        ) : (
          <p className="no-articles-message">No articles found</p>
        )}
      </div>
    </Layout>
  );
};

export default ArticlesList;
