import React, { useState, useEffect } from 'react'
import { fetchMovies } from "../service/main"
import { fetchGenres } from "../service/main"
import { fetchMovieByGenre } from "../service/main"
import { fetchPerson } from "../service/main"
import { fetchTopratedMovie } from "../service/main"
import { Link } from "react-router-dom"
import RBCarousel from "react-bootstrap-carousel"
import ReactStars from "react-rating-stars-component"
import "../index.css"

function Home() {
    //Now playing movies
    const [nowPlaying, setnowPlaying] = useState([]);

    //Buttons for each genres
    const [genres, setGenres] = useState([]);

    //Movie b Genre
    const [movieByGenre, setMovieByGenre] = useState([]);

    //Trending of this week
    const [persons, setPersons] = useState([]);

    //Toprated Movies
    const [topRated, setTopRated] = useState([])
    /* Navigation */
    const [navigateGenre, setNavigateGenre] = useState({
        beg : 0,
        end : 4
    })
    const [navigatePerson, setNavigatePerson] = useState({
        beg : 0,
        end : 4
    })
    const [navigateTopRank, setNavigateTopRank] = useState({
        beg : 0,
        end : 4
    })
    const handleNavigate = (name,setName,catergory) => {
        /* const capName = title.charAt(0).toUpperCase() + title.slice(1); */
        let length = catergory.length
        let start = name.beg;
        let finish = name.end;
        start = name.beg >= length-4 ? start = 0 : start = start + 4;
        finish = name.end >= length ? finish = 4 : finish = finish + 4;
        setName({beg : start,end:finish})
    }
    useEffect(() => {
        const fetchAPI = async () => {
            setnowPlaying(await fetchMovies());
            setGenres(await fetchGenres());
            setMovieByGenre(await fetchMovieByGenre());
            setPersons(await fetchPerson());
            setTopRated(await fetchTopratedMovie());
        };
        fetchAPI();
    }, []);
    //Handle Click for Genre
    const handleGenre = async (genre_id) => {
        setMovieByGenre(await fetchMovieByGenre(genre_id));
    }
    //Now Playing slider
    const movies = nowPlaying.slice(0, 5);
    const slider = movies.map((item, index) =>
        <div style={{ width: "100%", height: "500" }} key={index}>
            <div className="carousel-center">
                <img className="d-block w-100" style={{ height: 600 }} src={item.backPoster} alt={item.title} />
            </div>
            <Link to={`/movie/${item.id}`}>
                <div className="carousel-center play-btn"><i className="fas fa-play" style={{ fontSize: 80, color: "yellow" }}></i></div>
            </Link>
            <div className="carousel-caption" style={{ textAlign: "center", fontSize: 35 }}>{item.title}</div>
        </div>);
    //Buttons for each genres
    const genrelist = genres.map((item, index) => {
        return (
            <li className="list-inline-item" key={index}>
                <button className="btn btn-outline-info" onClick={() => { handleGenre(item.id) }}>{item.name}</button>
            </li>
        )
    });
    //Movie by Genre
    const movieList = movieByGenre.slice(navigateGenre.beg,navigateGenre.end).map((item, index) => {
        return (
            <div className="col-md-3 col-sm-6" key={index}>
                <div className="card m-1">
                    <Link to={`movie/${item.id}`}>
                        <img className="img-fluid" src={item.poster} alt={item.title} />
                    </Link>
                    <div className="mt-3 card-detail">
                        <p style={{ fontWeight: "bolder", color: "black" }} className="text-center">{item.title}</p>
                        <p style={{ color: "black" }}><span style={{ color: "#990066" }}>Rated :</span> {item.rating}</p>
                        <ReactStars count={item.rating} size={20} color={"#f4c10f"}></ReactStars>
                    </div>
                </div>
            </div>
        )
    })
    //Trending Persons
    const trendingPersons = persons.slice(navigatePerson.beg,navigatePerson.end).map((item, index) => {
        return (
            <div className="col-md-3 col-sm-6" key={index}>
                <img className="img-fluid round-circle mx-auto d-block" src={item.profileImg} alt={item.name} />
                <p className="font-weight-bold text-center">{item.name}</p>
            </div>
        )
    })
    //Top Rated Movies
    const topRatedList = topRated.slice(navigateTopRank.beg, navigateTopRank.end).map((item, index) => {
        return (
            <div className="col-md-3 text-center" key={index}>
                <div className="card m-1">
                    <Link to={`/movie/${item.id}`}>
                        <img className="img-fluid" src={item.poster} alt={item.title} />
                    </Link>
                    <div className="mt-3 card-detail">
                        <p style={{ fontWeight: "bolder", color: "black" }}>{item.title}</p>
                        <p style={{ color: "black" }}><span style={{ color: "#990066" }}>Rated :</span> {item.rating}</p>
                        <ReactStars count={item.rating} size={20} color={"#f4c10f"}></ReactStars>
                    </div>
                </div>
            </div>
        )
    })
    return (
        <div className="container">
            <div className="row mt-2">
                <div className="col">
                    <RBCarousel autoplay={true} pauseOnVisibility={true} version={4} indicators={true} slidesshowSpeed={3000}>{slider}</RBCarousel>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <ul className="list-inline">{genrelist}</ul>
                </div>
            </div>
            {/* Arrow Fontawesome */}
            <div className="row mt-3 ">
                <div className="col">
                    <div onClick={()=>handleNavigate(navigateGenre,setNavigateGenre,movieByGenre)} className="float-right">
                        <i className="far fa-arrow-alt-circle-right"></i>
                    </div>
                </div>
            </div>
            <div className="row mt-3">{movieList}</div>
            <div className="row mt-3">
                <div className="col">
                    <div className="font-weight-bold" style={{ color: "#5a606b" }}>
                        <p>TRENDING OF THIS WEEK</p>
                    </div>
                </div>
            </div>
            {/* Arrow Fontawesome */}
            <div className="row mt-3 ">
                <div className="col">
                    <div className="float-right" onClick={()=>handleNavigate(navigatePerson,setNavigatePerson,persons)}>
                        <i className="far fa-arrow-alt-circle-right"></i>
                    </div>
                </div>
            </div>
            <div className="row mt-3">{trendingPersons}</div>
            <div className="row mt-3">
                <div className="col">
                    <div className="font-weight-bold" style={{ color: "#5a606b" }}>
                        <p>TOP RATED MOVIES</p>
                    </div>
                </div>
            </div>
            {/* Arrow Fontawesome */}
            <div className="row mt-3 ">
                <div className="col">
                    <div onClick={()=>handleNavigate(navigateTopRank,setNavigateTopRank,topRated)} className="float-right">
                        <i className="far fa-arrow-alt-circle-right"></i>
                    </div>
                </div>
            </div>
            <div className="row mt-3">{topRatedList}</div>
            <hr className="mt-5" style={{ borderTop: "1px solid #5a606b" }} />
            <div className="row mt-3 mb-5">
                <div className="col-md-8 col-sm-6" style={{ color: "#5a606b" }}>
                    <h3>ABOUT ME</h3>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum nemo, voluptatem facilis id magni est illum ratione expedita aliquid repellat porro, aliquam enim consequuntur pariatur necessitatibus quas ullam voluptates unde.</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum nemo, voluptatem facilis id magni est illum ratione expedita aliquid repellat porro, aliquam enim consequuntur pariatur necessitatibus quas ullam voluptates unde.</p>
                    <ul className="list-inline">
                        <li className="list-inline-item">
                            <a href="/" style={{ color: "#0099ff" }}><i className="fab fa-facebook"></i></a>
                        </li>
                        <li className="list-inline-item">
                            <a href="/" style={{ color: "#0099ff" }}><i className="fab fa-twitter"></i></a>
                        </li>
                        <li className="list-inline-item">
                            <a href="/" style={{ color: "#0099ff" }}><i className="fab fa-instagram"></i></a>
                        </li>
                        <li className="list-inline-item">
                            <a href="/" style={{ color: "#0099ff" }}><i className="fab fa-youtube"></i></a>
                        </li>
                    </ul>
                </div>
                <div className="col-md-4 col-sm-6" style={{ color: "#5a606b" }}>
                    <h3>KEEP IN TOUCH</h3>
                    <ul className="list-unstyled">
                        <li>
                            <p>
                                <strong>
                                    <i className="fas fa-map-marker-alt"></i> :
                                </strong>{" "}
                                City, State, Country
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>
                                    <i className="fas fa-map-marker-alt"></i>Email :
                                </strong>{" "}
                                gtcelan@gmail.com
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>
                                    <i className="fas fa-map-marker-alt"></i>Phone :
                                </strong>{" "}
                                9698229654
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Home

