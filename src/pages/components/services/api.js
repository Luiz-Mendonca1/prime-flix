import axios from "axios";

// base url https://api.themoviedb.org/3/
// URL https://api.themoviedb.org/3/movie/now_playing?api_key=a0ee50c93a0ce6c7776896305c2124a4

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/' 
})

export default api