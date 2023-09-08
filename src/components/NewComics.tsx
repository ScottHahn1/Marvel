import {  Dispatch, SetStateAction, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../components/useFetch";
import { ComicsData, ComicParams, ComicDetails } from "../interfaces/IComics";
import { hash, publicKey, timestamp } from "../pages/Characters";

const date = new Date();
const today = new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString().slice(0, 10);
const twoMonthsFromNow = new Date(date.getFullYear(), date.getMonth() + 2, date.getDate()).toISOString().slice(0, 10);

const comicParams: ComicParams = {
    apikey: publicKey,
    ts: timestamp,
    hash: hash,
}

const NewComics = ({ setClicked }: { setClicked: Dispatch<SetStateAction<string | number>> }) => {
    const url = `http://gateway.marvel.com/v1/public/comics?&limit=100&orderBy=onsaleDate&dateRange=${today},${twoMonthsFromNow}`
    const [comics, setComics] = useState<ComicDetails[] | null>(null);
    const { data: comicsData, loading: comicsLoading } = useFetch<ComicsData[], ComicParams>(url, [], comicParams, undefined);
    const backgroundImgColor = 'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8))'

    useEffect(() => {
      comicsData.length && setComics(comicsData.map(group => group.data.results.filter(comic => !comic.thumbnail.path.match('image_not_available'))))
    }, [comicsData])
    
    return (
        comics && !comicsLoading ?
        <div>
            <div className="split-div-container montserrat">
                <div className="split-div-one">
                    <h3>Upcoming Comics</h3>
                    <p>Check out the newest Marvel comics coming soon!</p>
                    <strong>On sale {new Date(comics[0][0].dates[0].date).toLocaleDateString()} </strong>
                </div>

                <div className="split-div-two" style={{ background: `${backgroundImgColor}, url(${comics[0][0].thumbnail.path}.${comics[0][0].thumbnail.extension}`}}></div>

                <img src={ `${comics[0][0].thumbnail.path}.${comics[0][0].thumbnail.extension}` } alt={comics[0][0].title} />
            </div>
            <section className="home comics">
                {
                    comics[0].map(comic => {
                        return (
                            <div key={comic.id} className="home comic-info">
                            <p>{comic.title}</p>
                            <Link to="/comic-info">
                                <img
                                    style={{ cursor: "pointer" }}
                                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                                    alt={comic.title}
                                    onClick={() => setClicked(comic.id)}
                                />
                            </Link>
                            <p>{ new Date(comic.dates[0].date).toDateString() }</p>
                        </div>
                        )
                    }).slice(0, 6)
                }
            </section>
        </div>
        : 
        null
    )
}

export default NewComics;