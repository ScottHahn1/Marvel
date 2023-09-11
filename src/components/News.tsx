import {  useEffect, useState } from "react";
import useFetch from "../components/useFetch";
import { NewsData, INews } from "../interfaces/INews";
import '../styles/News.css';

interface IParams { page: number }

const News = () => {
    const [news, setNews] = useState<NewsData[]>([]);
    const [page, setPage] = useState(1);

    const params = { page: page };
    const url = '/.netlify/functions/api/news';
    const { data: newsData, hasMore } = useFetch<INews[], IParams>(url, [], params, undefined, page);

    useEffect(() => {
        if (newsData.length > 0) {
            setNews(newsData.map(group => group.articles.filter(article => {
                if (article.urlToImage !== null) {
                    if (article.title.match("Marvel")?.toString().toUpperCase()) {
                        return article;
                    }
                    else if (article.description.match("Marvel")?.toString().toUpperCase()) {
                        return article;
                    }
                }
            }
            )))
        }
    }, [newsData])

    return (
        news.length > 0 ?
        <section className="news">
            <h2>Latest News</h2>
            {
                news.map(data => 
                    data.map((article) => 
                        <div key={article.title} className="news-info">
                            <img src={article.urlToImage} alt={article.title} />
                            <div>
                                <strong>{article.title}</strong>
                                <p>{article.description}</p>
                                <a href={article.url} target="_blank"><button>Read Article</button></a>
                            </div>
                        </div>
                    )
                )
            }
            { hasMore && <button className="show-more" onClick={() => setPage(prev => prev + 1)}>Show More</button> }
        </section>
        :
        null
    )
}

export default News;