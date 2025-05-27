import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Filmes from "./pages/Filme";
import Header from "./pages/components/Header";
import Erro from "./pages/Erro";
import Salvos from './pages/Salvo/Salvos'

function RoutesApp() {
    return (
        <BrowserRouter>
            <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/filme/:id" element={<Filmes />} />
                    <Route path="*" element={<Erro />} />
                    <Route path="/salvos" element={<Salvos />} />
                </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;