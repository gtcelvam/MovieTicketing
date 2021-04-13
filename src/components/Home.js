import React,{useState, useEffect} from 'react'
import {fetchMovies} from "../service/main"
import RBCarousel from "react-bootstrap-carousel"

function Home() {
    const [nowPlaying, setnowPlaying] = useState([]);
    useEffect(() => {
        const fetchAPI = async ()=>{
            setnowPlaying(await fetchMovies());
        };
        fetchAPI();
    }, []);
    const movies = nowPlaying.slice(0,5).map((item,index)=>{
        return(
            <div key={index}>
                <div className="carousel-center">
                    <img style={{height: 600}} src={item.backPoster} alt={item.title}/>
                </div>
            </div>
        );
    });
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <RBCarousel
                        autoplay={true}
                        pauseOnVisibility={true}
                        slidesshowSpeed={500}
                        version={4}
                        indicators={false}
                        >{movies}
                    </RBCarousel>
                </div>
            </div>
        </div>
    )
}

export default Home
