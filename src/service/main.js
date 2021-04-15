import axios from "axios";
import dotenv from "dotenv"

dotenv.config();



const API_Key = process.env.REACT_APP_API_Key ;
const url = `https://api.themoviedb.org/3/`;
const nowPlayingUrl = `${url}movie/now_playing`;
const topratedUrl = `${url}movie/top_rated`
const movieUrl = `${url}movie`
const moviesUrl = `${url}discover/movie`
const genreUrl = `${url}genre/movie/list`
const personUrl = `${url}trending/all/day`
const posterUrl = "https://image.tmdb.org/t/p/original/"
/* const configuration = `${url}configuration?api_key=${API_Key}` */
//https://api.themoviedb.org/3/movie/now_playing?api_key=<<api_key>>&language=en-US&page=
//https://api.themoviedb.org/3/configuration?api_key=<<api_key>>

export const fetchMovies = async ()=>{
    try {
        const {data} = await axios.get(nowPlayingUrl,{
            params: {
                api_key : API_Key,
                language: "en_US",
                page: 1
            }
        });
        const modifiedData = data["results"].map((item)=>({
            id : item.id,
            backPoster: posterUrl+item.backdrop_path,
            popularity: item.popularity,
            title: item.title,
            poster: posterUrl+item.poster_path,
            overview: item.overview,
            rating: item.vote_average
        }));
        return modifiedData;
    } catch (error) {
        
    }
}

export const fetchGenres = async ()=>{
    try {
        const {data} = await axios.get(genreUrl,{
            params :{
                api_key : API_Key,
                language : "en_US",
                page : 1
            }
        })
        const modifiedData = data["genres"].map((item)=>({
            id : item.id,
            name : item.name
        }))  
        return modifiedData;
    } catch (error) {
        
    }
}

export const fetchMovieByGenre = async (genre_id)=>{
    try {
        const {data} = await axios.get(moviesUrl,{
            params :{
                api_key : API_Key,
                language : "en_US",
                page : 1,
                with_genres: genre_id
            }
        })
        const modifiedData = data["results"].map((item)=>({
            id : item.id,
            backPoster: posterUrl+item.backdrop_path,
            popularity: item.popularity,
            title: item.title,
            poster: posterUrl+item.poster_path,
            overview: item.overview,
            rating: item.vote_average
        })); 
        return modifiedData     
    } catch (error) {
        
    }
}

export const fetchPerson = async ()=>{
    try {
        const {data} = await axios.get(personUrl,{
            params : {
                api_key : API_Key
            }
        })
        const modifiedData = data["results"].map((item)=>({
            id : item.id,
            popularity : item.popularity,
            name : item.name,
            profileImg : `https://image.tmdb.org/t/p/w200${item.poster_path}`,
            known : item.known_for_department
        }))
        console.log(data);
        return modifiedData
    } catch (error) {
        
    }
}