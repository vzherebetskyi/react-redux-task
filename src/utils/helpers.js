import { APITypes } from "./constants";

// article object structure
// const articleObject = {
//     author: string,
//     content: string,
//     publishedAt: Date,
//     source: string,
//     title: string,
//     url: string | null,
//     urlToImage: string | null
// }

export const convertArticlesDataToUnifiedFormat = (articles, APIType) => {
    if (APIType === APITypes[0]) {
        const unifiedArticles = articles.map(article => ({
            author: article.author && article.author.length > 0 ? article.author : 'No info',
            content: article.content && article.content.length > 0 ? article.content : 'No info',
            publishedAt: article.publishedAt && article.publishedAt.length > 0 ? article.publishedAt : 'No info',
            source: article.source && article.source.name ? article.source.name : 'No info',
            title: article.title && article.title.length > 0 ? article.title : 'No info',
            url: article.url && article.url.length > 0 ? article.url : null,
            urlToImage: article.urlToImage && article.urlToImage.length > 0 ? article.urlToImage : null,
            api: APIType
        }));

        return unifiedArticles;
    }
    if (APIType === APITypes[1]) {
        const unifiedArticles = articles.map(article => ({
            author: article?.fields?.byline || 'No info',
            content: 'No info',
            publishedAt: article?.webPublicationDate || 'No info',
            source: 'The Guardian',
            title: article?.webTitle || 'No info',
            url: article?.webUrl || null,
            urlToImage: null,
            api: APIType
        }));

        return unifiedArticles;
    }
    if (APIType === APITypes[2]) {
        const unifiedArticles = articles.map(article => ({
            author: article?.byline?.original || 'No info',
            content: article?.abstract || 'No info',
            publishedAt: article?.pub_date || 'No info',
            source: 'The New York Times',
            title: article?.headline?.main || 'No info',
            url: article?.web_url || null,
            urlToImage: article.multimedia && article.multimedia.length > 0 ? `https://static01.nyt.com/${article.multimedia[0].url}` : null,
            api: APIType
        }));

        return unifiedArticles;
    }
};
