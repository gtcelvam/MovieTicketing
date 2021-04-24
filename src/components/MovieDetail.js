import React, { useEffect, useState } from 'react'
import { fetchMovieDetail, fetchMovieVideos, fetchSimilarMovies,fetchCasts } from "../service/main"
import "../index.css"
import { Modal } from "react-bootstrap"
import ReactStars from "react-rating-stars-component"
import ReactPlayer from "react-player"
import {Link} from "react-router-dom"

function MovieDetail({ match }) {
    let params = match.params;
    let genres = []
    const [detail, setDetail] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [video, setVideo] = useState([]);
    const [casts,setCasts] = useState([]);
    const [similarMovie,setSimilarMovie] = useState([]);
    useEffect(() => {
        const fetchAPI = async () => {
            setDetail(await fetchMovieDetail(params.id));
            setVideo(await fetchMovieVideos(params.id));
            setCasts(await fetchCasts(params.id));
            setSimilarMovie(await fetchSimilarMovies(params.id));
        }
        fetchAPI();
    }, [params.id]);
    genres = detail.genres;
    const MoviePlayerModal = (props) => {
        const youtubeUrl = `https://www.youtube.com/watch?v=`;
        return (
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" style={{ color: "#000000", fontWeight: "bolder" }}>{detail.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: "#000000" }}>
                    <ReactPlayer className="container-fluid" url={youtubeUrl + video.key} playing width="100%"></ReactPlayer>
                </Modal.Body>
            </Modal>
        )
    }
    let genresList;
    if(genres){
        genresList = genres.map((item,index)=>{
            return (
                <li className="list-inline-item" key={index}>
                    <button type="button" className="btn btn-outline-info">{item.name}</button>
                </li>
            )
        })
    }
    const castList = casts.slice(0,4).map((item,index)=>{
        return(
            <div className="col-md-3 text-center" key={index}>
                <img src={item.img} alt={item.name} className="img-fluid rounded circle mx-auto d-block"/>
                <p className="font-weight-bold text-center">{item.name}</p>
                <p className="font-weight-bold text-center" style={{color : "#5a606b"}}>{item.character}</p>
            </div>

        )
    });
    const similarMovieList = similarMovie.slice(0,4).map((item,index)=>{
        return(
            <div className="col-md-3 text-center" key={index}>
                <div className="card m-1">
                    <Link to={`/movie/${item.id}`}>
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
    return (
        <div className="container">
            <div className="row" style={{ width: "100%", height: "500" }}>
                <MoviePlayerModal show={isOpen} onHide={() => { setIsOpen(false) }}></MoviePlayerModal>
                <div className="col">
                    <div className="carousel-center">
                        <img className="d-block w-100" style={{ height: 600 }} src={`https://image.tmdb.org/t/p/original${detail.backdrop_path}`} alt={detail.title} />
                    </div>
                    <div className="carousel-center play-btn"><i onClick={() => { setIsOpen(true) }} className="fas fa-play" style={{ fontSize: 80, color: "yellow" }}></i></div>
                    <div className="carousel-caption" style={{ textAlign: "center", fontSize: 35 }}>{detail.title}</div>
                </div>
            </div>
                <div className="row mt-3">
                    <div className="col">
                        <p style={{ color: "#5a606b", fontWeight: "bolder" }}>GENRE</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <ul className="list-inline">{genresList}</ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="text center">
                            <ReactStars count={detail.vote_average} size={20} color1={"#f4c10f"}></ReactStars>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <p style={{color : "#5a606b", fontWeight : "bolder"}}>OVERVIEW</p>
                        {detail.overview}
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-3">
                        <p style={{color : "#5a606b", fontWeight : "bolder"}}>RELEASE DATE</p>
                        <p style={{color : "#F4C10F"}}>{detail.release_date}</p>
                    </div>
                    <div className="col-md-3">
                        <p style={{color : "#5a606b", fontWeight : "bolder"}}>RUN TIME</p>
                        <p style={{color : "#F4C10F"}}>{detail.runtime}</p>
                    </div>
                    <div className="col-md-3">
                        <p style={{color : "#5a606b", fontWeight : "bolder"}}>BUDGET</p>
                        <p style={{color : "#F4C10F"}}>{detail.budget}</p>
                    </div>
                    <div className="col-md-3">
                        <p style={{color : "#5a606b", fontWeight : "bolder"}}>HOMEPAGE</p>
                        <p style={{color : "#F4C10F"}}>{detail.homepage}</p>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <p style={{color : "#5a606b", fontWeight : "bolder"}}>CASTS</p>
                    </div>
                </div>
                <div className="row mt-3">{castList}</div>
                <div className="row mt-3">
                    <div className="col">
                        <p style={{color : "#5a606b", fontWeight : "bolder"}}>SIMILAR MOVIES</p>
                    </div>
                </div>
                <div className="row mt-3">{similarMovieList}</div>
                {/* FOOTER */}
                <hr className="mt-5" style={{borderTop : "1px solid #5a606b"}}/>
            <div className="row mt-3 mb-5">
                <div className="col-md-8 col-sm-6" style={{color : "#5a606b"}}>
                    <h3>ABOUT ME</h3>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum nemo, voluptatem facilis id magni est illum ratione expedita aliquid repellat porro, aliquam enim consequuntur pariatur necessitatibus quas ullam voluptates unde.</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum nemo, voluptatem facilis id magni est illum ratione expedita aliquid repellat porro, aliquam enim consequuntur pariatur necessitatibus quas ullam voluptates unde.</p>
                    <ul className="list-inline">
                        <li className="list-inline-item">
                            <a href="/" style={{color : "#990066"}}><i className="fab fa-facebook"></i></a>
                        </li>
                        <li className="list-inline-item">
                            <a href="/" style={{color : "#990066"}}><i className="fab fa-twitter"></i></a>
                        </li>
                        <li className="list-inline-item">
                            <a href="/" style={{color : "#990066"}}><i className="fab fa-instagram"></i></a>
                        </li>
                        <li className="list-inline-item">
                            <a href="/" style={{color : "#990066"}}><i className="fab fa-youtube"></i></a>
                        </li>
                    </ul>
                </div>
                <div className="col-md-4 col-sm-6" style={{color : "#5a606b"}}>
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

export default MovieDetail
