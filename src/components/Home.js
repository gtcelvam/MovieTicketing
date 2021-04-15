import React, { useState, useEffect } from 'react'
import { fetchMovies } from "../service/main"
import { fetchGenres } from "../service/main"
import { fetchMovieByGenre } from "../service/main"
import { fetchPerson } from "../service/main"
import {Link} from "react-router-dom"
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

    //Top Person of this week
    const [persons, setPersons] = useState([]);
    useEffect(() => {
        const fetchAPI = async () => {
            setnowPlaying(await fetchMovies());
            setGenres(await fetchGenres());
            setMovieByGenre(await fetchMovieByGenre());
            setPersons(await fetchPerson());
        };
        fetchAPI();
    }, []);
    //Now Playing slider
    const movies = nowPlaying.slice(0, 5)
    const slider = movies.map((item, index) => 
    <div style={{width : "100%",height : "500"}} key={index}>
        <div className="carousel-center">
            <img style={{ height: 600 }} src={item.backPoster} alt={item.title} />
        </div>
        <div className="carousel-center play-btn"><i className="fas fa-play" style={{fontSize : 80,color: "yellow"}}></i></div>
        <div className="carousel-caption" style={{textAlign:"center",fontSize: 35}}>{item.title}</div>
    </div>);
    //Buttons for each genres
    const genrelist = genres.map((item,index)=>{
        return(
            <li className="list-inline-item" key={index}>
                <button className="btn btn-outline-info">{item.name}</button>
            </li>
        )
    })
    //Movie by Genre
    const movieList = movieByGenre.slice(0,4).map((item,index)=>{
        return(
            <div className="col-md-3 col-sm-6" key={index}>
                <div className="card">
                    <Link to={`movie/${item.id}`}>
                        <img className="img-fluid" src={item.poster} alt={item.title}/>
                    </Link>
                    <div className="mt-3 card-detail">
                        <p style={{fontWeight : "bolder", color : "black"}}>{item.title}</p>
                        <p style={{color : "black"}}><span style={{color : "#990066"}}>Rated :</span> {item.rating}</p>
                        <ReactStars count={item.rating} size={20} color={"#f4c10f"}></ReactStars>
                    </div>
                </div>
            </div>
        )
    })
    //Trending Persons
    const trendingPersons = persons.slice(0,4).map((item,index)=>{
        return(
            <div className="col-md-3 col-sm-6" key={index}>
                <img className="img-fluid round-circle mx-auto d-block" src={item.profileImg} alt={item.name}/>
                <p className="font-weight-bold text-center">{item.name}</p>
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
            <div className="row mt-3">{movieList}</div>
            <div className="row mt-3">
                <div className="col">
                    <div className="font-weight-bold" style={{color : "#5a606b"}}>
                        <p>TRENDING OF THIS WEEK</p>
                    </div>
                </div>
            </div>
            <div className="row mt-3">{trendingPersons}</div>
        </div>
    )
}

export default Home

