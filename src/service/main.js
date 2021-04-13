import axios from "axios";
import dotenv from "dotenv"

dotenv.config();



const API_Key = process.env.REACT_APP_API_Key ;
const url = `https://api.themoviedb.org/3/`;
const nowPlayingUrl = `${url}movie/now_playing`;
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
        const modifiedData = data["results"].map(item=>({
            id : item.id,
            backPoster: posterUrl+item.backdrop_path,
            popularity: item.popularity,
            title: item.title,
            poster: posterUrl+item.poster_path,
            overview: item.overview,
            rating: item.vote_average
        }));
        console.log(modifiedData);
        return modifiedData;
    } catch (error) {
        
    }
}



