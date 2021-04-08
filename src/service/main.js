import React from "react"
import axios from "axios";
import dotenv from "dotenv"

dotenv.config();



const API_Key = process.env.REACT_APP_API_Key ;
const url = `https://api.themoviedb.org/3/`;
const nowPlayingUrl = `${url}movie/now_playing`
const configuration = `${url}configuration?api_key=${API_Key}`
//https://api.themoviedb.org/3/movie/now_playing?api_key=<<api_key>>&language=en-US&page=
//https://api.themoviedb.org/3/configuration?api_key=<<api_key>>

const FetchMovies = async ()=>{}

export default FetchMovies

