

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function GETCuidados() {
    const navigate = useNavigate();
    const [message, setMessage] = useState(null);
    const [cuidados, setCuidados] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [filter, setFilter] = useState("");

    useEffect(() => {
        setLoading(true);
        axios.get("http://localhost:3000/cuidado")
            .then(response => {
                setCuidados(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log("Erro ao carregar tarefa.", error);
                setError("Erro ao carregar tarefas de cuidado.");
                setLoading(false);
            });
    }, []);

    async function ExcluirCuidado(id, tipo) {
        if (!window.confirm(`Tem certeza que deseja excluir o cuidado do tipo ${tipo}?`)) {
            return;
        }

        setMessage(null);

        try {
            await axios.delete(`http://localhost:3000/Excluir-cuidado/${id}`);
            setMessage(`Cuidado (${tipo}) excluído com sucesso!`);
            setTimeout(() => window.location.reload(), 800);
        } catch (error) {
            console.error("Erro ao excluir cuidado:", error);
            setMessage("Erro ao excluir cuidado");
        }
    }

    const filteredCuidados = cuidados.filter(c => {
        const term = filter.trim().toLowerCase();
        if (!term) return true;
        const tipo = (c.tipo || "").toLowerCase();
        const descricao = (c.descricao || "").toLowerCase();
        const frequencia = (c.frequencia || "").toLowerCase();
        return tipo.includes(term) || descricao.includes(term) || frequencia.includes(term);
    });

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="container mx-auto flex-grow py-8 px-4 mt-16">
                {message && (
                    <div className={`mx-auto max-w-7xl p-4 mt-4 text-sm rounded-lg ${message.includes('Erro')
                        ? 'text-red-700 bg-red-100'
                        : 'text-green-700 bg-green-100'
                        }`} role="alert">
                        {message}
                    </div>
                )}
                <div className="bg-white rounded-lg shadow-md">
                    <div className="bg-white p-4 rounded-t-lg border-b">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <h2 className="text-2xl font-semibold text-azul-primario">
                                Gerenciar Tarefas de Cuidados
                            </h2>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                    placeholder="Filtrar por tipo ou descrição"
                                    className="border rounded px-3 py-2 text-sm"
                                />
                                <button
                                    onClick={() => navigate('/')}
                                    className="bg-gray-200 text-gray-800 font-medium py-2 px-3 rounded hover:bg-gray-300 transition-colors duration-150"
                                >
                                    Home
                                </button>
                                <button
                                    onClick={() => navigate('/CadastroCuidados')}
                                    className="bg-verde-calmo text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center gap-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                                    </svg>
                                    Nova Tarefa
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="p-4">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="border-b-2 border-gray-200">
                                    <tr>
                                        <th className="p-3 text-sm font-semibold tracking-wide">ID</th>
                                        <th className="p-3 text-sm font-semibold tracking-wide">Tipo</th>
                                        <th className="p-3 text-sm font-semibold tracking-wide">Frequência</th>
                                        <th className="p-3 text-sm font-semibold tracking-wide">Descrição</th>
                                        <th className="p-3 text-sm font-semibold tracking-wide">Cuidado criado em</th>
                                        <th className="p-3 text-sm font-semibold tracking-wide text-center">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan="6" className="p-4 text-center text-gray-500">Carregando...</td>
                                        </tr>
                                    ) : error ? (
                                        <tr>
                                            <td colSpan="6" className="p-4 text-center text-red-500">{error}</td>
                                        </tr>
                                    ) : filteredCuidados.length > 0 ? (
                                        filteredCuidados.map((cuidado, index) => (
                                            <tr key={cuidado.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{cuidado.id}</td>
                                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{cuidado.tipo}</td>
                                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{cuidado.frequencia}</td>
                                                <td className="p-3 text-sm text-gray-700">{cuidado.descricao.substring(0, 50)}...</td>
                                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                                    {cuidado.criado_em ? new Date(cuidado.criado_em).toLocaleDateString('pt-BR') : 'N/A'}
                                                </td>
                                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                                    <div className="flex justify-center gap-2">
                                                        <button
                                                            onClick={() => navigate(`/AtualizarCuidado/${cuidado.id}`)}
                                                            className="text-blue-500 hover:text-blue-700">Editar</button>
                                                        <button
                                                            onClick={() => ExcluirCuidado(cuidado.id, cuidado.tipo)}
                                                            className="text-red-500 hover:text-red-700">Excluir</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="p-4 text-center text-gray-500">Nenhuma tarefa de cuidado encontrada.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}