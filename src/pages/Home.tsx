import '../styles/Home.css';
import News from "../components/News";
import FeaturedMovie from "../components/FeaturedMovie";
import NewComics from "../components/NewComics";
import { Dispatch, SetStateAction, useState } from 'react';

const Home = ({ clicked, setClicked }: { clicked: string | number, setClicked: Dispatch<SetStateAction<string | number>> }) => {
    const [featuredMovieLoading, setFeaturedMovieLoading] = useState<boolean>(true);

    return (
        <main className='main'>
            <FeaturedMovie setLoading={setFeaturedMovieLoading} />
            { !featuredMovieLoading && <News /> }
            { !featuredMovieLoading && <NewComics clicked={clicked} setClicked={setClicked} /> } 
        </main>
    )
}

export default Home;