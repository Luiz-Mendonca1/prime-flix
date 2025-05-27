import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Filmes from '../Filme/';

function Salvos() {
    const [filmesSalvos, setFilmesSalvos] = useState([]);

    useEffect(() => {
        const meusFilmes = localStorage.getItem('savedMovies');
        if (meusFilmes) {
            setFilmesSalvos(JSON.parse(meusFilmes));
        }
    }, []);

    const removeFilme = (id) => {
        const novosFilmes = filmesSalvos.filter((filme) => filme.id !== id);
        setFilmesSalvos(novosFilmes);
        localStorage.setItem('savedMovies', JSON.stringify(novosFilmes));
    };

    return (
        <div className="filme-info">
            <h1>Meus Filmes Salvos</h1>
            
            {filmesSalvos.length === 0 ? (
                <div className="sem-filmes">
                    <p>Nenhum filme salvo ainda.</p>
                    <Link to="/">Voltar para a home</Link>
                </div>
            ) : (
                <ul className="lista-filmes">
                    {filmesSalvos.map((filme) => (
                        <li key={filme.id}>
                            <Link to={`/filme/${filme.id}`}>
                                <img 
                                    src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} 
                                    alt={filme.title} 
                                />
                                <span>{filme.title}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Salvos;