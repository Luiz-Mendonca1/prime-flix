import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../components/services/api";
import "./filme.css";
import { toast } from 'react-toastify';

function Filmes() {
    const { id } = useParams();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);
    const [isSaved, setIsSaved] = useState(false); // Novo estado para controle visual

    useEffect(() => {
        async function loadFilmes() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "a0ee50c93a0ce6c7776896305c2124a4"
                }
            })
            .then((response) => {
                setFilme(response.data);
                setLoading(false);
                
                // Verifica se o filme já está salvo ao carregar
                const savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
                const alreadySaved = savedMovies.some(movie => movie.id === response.data.id);
                setIsSaved(alreadySaved);
            })
            .catch(() => {
                console.log('Filme não encontrado');
            });
        }

        loadFilmes();

        return () => {
            console.log('Componente desmontado');
        };
    }, [id]); // Adicionei `id` como dependência para recarregar ao mudar de filme

    const handleSaveMovie = () => {
        const savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
        
        if (isSaved) {
            // Remove o filme se já estiver salvo
            const updatedMovies = savedMovies.filter(movie => movie.id !== filme.id);
            localStorage.setItem('savedMovies', JSON.stringify(updatedMovies));
            setIsSaved(false);
            toast.success('filme removido!')
        } else {
            // Adiciona o filme se não estiver salvo
            const updatedMovies = [...savedMovies, filme];
            localStorage.setItem('savedMovies', JSON.stringify(updatedMovies));
            setIsSaved(true);
            toast.success('filme salvo!')
            const handleSaveMovie = () => {
  const savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
  
  if (isSaved) {
    const updatedMovies = savedMovies.filter(movie => movie.id !== filme.id);
    localStorage.setItem('savedMovies', JSON.stringify(updatedMovies));
    setIsSaved(false);
    toast.success(`${filme.title} removido da lista!`, { icon: '🗑️' }); // Alerta personalizado
  } else {
    const updatedMovies = [...savedMovies, filme];
    localStorage.setItem('savedMovies', JSON.stringify(updatedMovies));
    setIsSaved(true);
    toast.success(`${filme.title} salvo com sucesso!`, { icon: '🎬' });
  }
};
        }
    };

    if (loading) {
        return (
            <div className="loading">
                Carregando detalhes...
            </div>
        );
    }

    return (
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img 
                src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} 
                alt={filme.title} 
            />

            <div className="movie-meta">
                <span className="release-date">{filme.release_date?.substring(0, 4)}</span>
                <div className="rating">
                    <span className="rating-value">{filme.vote_average}</span>
                    <span>/10</span>
                </div>
            </div>

            <h2>Sinopse</h2>
            <p className="overview">{filme.overview}</p>

            <div className="area-buttons">
                <button 
                    onClick={handleSaveMovie}
                    style={{ backgroundColor: isSaved ? "#ff0000" : "#4CAF50" }}
                >
                    {isSaved ? "Remover" : "Salvar"}
                </button>
                <button>
                    <a 
                        href={`https://www.youtube.com/results?search_query=${filme.title}+trailer`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    );
}

export default Filmes;