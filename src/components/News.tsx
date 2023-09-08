import {  useEffect, useState } from "react";
import useFetch from "../components/useFetch";
import { INewsParams, NewsData, INews } from "../interfaces/INews";
import '../styles/News.css';

const date = new Date();
const lastWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 6).toISOString().slice(0, 10);
const today = new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString().slice(0, 10);

const News = () => {
    const [news, setNews] = useState<NewsData[]>([]);
    const [newsPageNumber, setNewsPageNumber] = useState(1);

    const newsParams: INewsParams = {
        apikey: '80cb349609ca47068ca5a9fbf644a325',
        sortBy: "relevancy",
        from: lastWeek,
        to: today,
        language: "en",
        pageSize: 2,
        page: newsPageNumber
    }

    const { data: newsData, hasMore } = useFetch<INews[], INewsParams>("https://newsapi.org/v2/everything?q=mcu", [], newsParams, undefined, newsPageNumber);

    useEffect(() => {
        if (newsData.length > 0) {
            setNews(newsData.map(group => group.articles.filter(article => 
                (article.urlToImage !== null && article.title.match("Marvel")?.toString().toUpperCase()) || article.description.match("Marvel")?.toString().toUpperCase()
            )))
        }
        else {
            setNewsPageNumber(prev => prev + 1);
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
            { hasMore && <button className="show-more" onClick={() => setNewsPageNumber(prev => prev + 1)}>Show More</button> }
        </section>
        :
        null
    )
}

export default News;