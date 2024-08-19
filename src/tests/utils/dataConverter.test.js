import { convertArticlesDataToUnifiedFormat } from '../../utils/helpers';
import { APITypes } from '../../utils/constants';

const newsApiArticleObject = [
  {
    author: 'MarketBeat News',
    content:
      'Cetera Advisors LLC purchased a new stake in shares of iShares MSCI ACWI ex U.S. ETF (NASDAQ:ACWX – Free Report) in the 1st quarter, according to its most recent filing with the Securities and Exchan… [+3052 chars]',
    description:
      'Cetera Advisors LLC purchased a new stake in shares of iShares MSCI ACWI ex U.S. ETF (NASDAQ:ACWX – Free Report) in the 1st quarter, according to its most recent filing with the Securities and Exchange Commission. The fund purchased 4,276 shares of the compan…',
    publishedAt: '2024-08-18T08:54:45Z',
    source: { id: null, name: 'ETF Daily News' },
    title: 'Cetera Advisors LLC Invests $228,000 in iShares MSCI ACWI ex U.S. ETF (NASDAQ:ACWX)',
    url: 'https://www.etfdailynews.com/2024/08/18/cetera-advisors-llc-invests-228000-in-ishares-msci-acwi-ex-u-s-etf-nasdaqacwx/',
    urlToImage:
      'https://www.americanbankingnews.com/wp-content/timthumb/timthumb.php?src=https://www.marketbeat.com/logos/ishares-msci-acwi-ex-us-etf-logo-1200x675.jpg?v=20240607095020&w=240&h=240&zc=2',
  },
];

const guardianApiArticleObject = [
  {
    apiUrl:
      'https://content.guardianapis.com/music/article/2024/may/28/news-of-the-world-paid-women-to-sleep-with-celebrities-james-blunt-says',
    fields: { byline: 'Lucy Knight and Jim Waterson' },

    id: 'music/article/2024/may/28/news-of-the-world-paid-women-to-sleep-with-celebrities-james-blunt-says',
    isHosted: false,
    pillarId: 'pillar/arts',
    pillarName: 'Arts',
    sectionId: 'music',
    sectionName: 'Music',
    type: 'article',
    webPublicationDate: '2024-05-28T13:51:14Z',
    webTitle: 'News of the World paid women to sleep with celebrities, James Blunt says',
    webUrl:
      'https://www.theguardian.com/music/article/2024/may/28/news-of-the-world-paid-women-to-sleep-with-celebrities-james-blunt-says',
  },
];

const NYTApiArticleObject = [
  {
    abstract:
      'A news report used a hidden camera to show members of the youth arm of Brothers of Italy glorifying fascism.',
    byline: { original: 'By Emma Bubola' },
    document_type: 'article',
    headline: { main: 'Meloni Condemns Fascist Nostalgia Amid Scandal in Her Party’s Youth Wing' },
    keywords: [{ name: 'persons', value: 'Meloni, Giorgia (1977- )', rank: 1, major: 'N' }],
    lead_paragraph:
      'Italy’s prime minister, Giorgia Meloni, urged leaders of her political party on Tuesday to reject antisemitism, racism and nostalgia for totalitarian regimes after an Italian news outlet caught on a hidden camera members of the youth section of her party glorifying fascism.',
    multimedia: [{ rank: 0, subtype: 'xlarge', caption: null, credit: null, type: 'image' }],
    news_desk: 'Foreign',
    print_page: '12',
    print_section: 'A',
    pub_date: '2024-07-02T21:30:02+0000',
    section_name: 'World',
    snippet:
      'A news report used a hidden camera to show members of the youth arm of Brothers of Italy glorifying fascism.',
    source: 'The New York Times',
    subsection_name: 'Europe',
    type_of_material: 'News',
    uri: 'nyt://article/469be5a2-3ebf-5982-924c-cfacda912e06',
    web_url: 'https://www.nytimes.com/2024/07/02/world/europe/meloni-political-party-youth-wing-facism.html',
    word_count: 629,
    _id: 'nyt://article/469be5a2-3ebf-5982-924c-cfacda912e06',
  },
];

test('should correctly convert data 1 (news API)', () => {
  const convertedData = convertArticlesDataToUnifiedFormat(newsApiArticleObject, APITypes[0]);

  expect(convertedData).toEqual([
    [
      {
        api: 'newsAPI',
        author: 'MarketBeat News',
        category: 'mixed',
        content:
          'Cetera Advisors LLC purchased a new stake in shares of iShares MSCI ACWI ex U.S. ETF (NASDAQ:ACWX – Free Report) in the 1st quarter, according to its most recent filing with the Securities and Exchan… [+3052 chars]',
        publishedAt: '2024-08-18T08:54:45Z',
        source: 'ETF Daily News',
        title: 'Cetera Advisors LLC Invests $228,000 in iShares MSCI ACWI ex U.S. ETF (NASDAQ:ACWX)',
        unifiedDate: '18th August 2024',
        url: 'https://www.etfdailynews.com/2024/08/18/cetera-advisors-llc-invests-228000-in-ishares-msci-acwi-ex-u-s-etf-nasdaqacwx/',
        urlToImage:
          'https://www.americanbankingnews.com/wp-content/timthumb/timthumb.php?src=https://www.marketbeat.com/logos/ishares-msci-acwi-ex-us-etf-logo-1200x675.jpg?v=20240607095020&w=240&h=240&zc=2',
      },
    ],
    {
      category: ['mixed'],
      date: ['18th August 2024'],
      source: ['ETF Daily News'],
    },
  ]);
});

test('should correctly convert data 2 (guardian API)', () => {
  const convertedData = convertArticlesDataToUnifiedFormat(guardianApiArticleObject, APITypes[1]);

  expect(convertedData).toEqual([
    [
      {
        api: 'guardianAPI',
        author: 'Lucy Knight and Jim Waterson',
        category: 'Music',
        content: 'No info',
        publishedAt: '2024-05-28T13:51:14Z',
        source: 'The Guardian',
        title: 'News of the World paid women to sleep with celebrities, James Blunt says',
        unifiedDate: '28th May 2024',
        url: 'https://www.theguardian.com/music/article/2024/may/28/news-of-the-world-paid-women-to-sleep-with-celebrities-james-blunt-says',
        urlToImage: null,
      },
    ],
    {
      category: ['Music'],
      date: ['28th May 2024'],
      source: ['The Guardian'],
    },
  ]);
});

test('should correctly convert data 3 (NYT API)', () => {
  const convertedData = convertArticlesDataToUnifiedFormat(NYTApiArticleObject, APITypes[2]);

  expect(convertedData).toEqual([
    [
      {
        api: 'NYTAPI',
        author: 'By Emma Bubola',
        category: 'World',
        content:
          'A news report used a hidden camera to show members of the youth arm of Brothers of Italy glorifying fascism.',
        publishedAt: '2024-07-02T21:30:02+0000',
        source: 'The New York Times',
        title: 'Meloni Condemns Fascist Nostalgia Amid Scandal in Her Party’s Youth Wing',
        unifiedDate: '2nd July 2024',
        url: 'https://www.nytimes.com/2024/07/02/world/europe/meloni-political-party-youth-wing-facism.html',
        urlToImage: 'https://static01.nyt.com/undefined',
      },
    ],
    {
      category: ['World'],
      date: ['2nd July 2024'],
      source: ['The New York Times'],
    },
  ]);
});
