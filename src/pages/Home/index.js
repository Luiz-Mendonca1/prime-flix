import { useEffect, useState } from "react";
import api from "../components/services/api";
import { Link } from "react-router-dom";
import './home.css';

function Home() {
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoadiang] = useState(true)

    useEffect(() => { 
        async function loadFilmes() {
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: "a0ee50c93a0ce6c7776896305c2124a4",
                    page: 1,
                }
            });
            setFilmes(response.data.results);
            setLoadiang(false)
        }
        
        loadFilmes();
    }, []);

    if(loading){
        return(
            <div className="loading">
                <h2>Loanding movies...</h2>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="lista-filme">
                <h1>Home prime</h1>
                {filmes.map(filme => (
                    <article key={filme.id}>
                        <div key={filme.id}>
                            <h2>{filme.title}</h2>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}></img>
                            <Link to={`filme/${filme.id}`}>Acessar</Link>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}

export default Home;