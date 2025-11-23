
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AtualizacaoCuidados() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [tipo, setTipo] = useState("");
    const [frequencia, setFrequencia] = useState("");
    const [descricao, setDescricao] = useState("");
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);

    const CUIDADO_OPTIONS = [
        { valor: "alimentacao", label: "Alimentação" },
        { valor: "Cuidado veterinario", label: "Cuidado Veterinário e de Saúde" },
        { valor: "recinto", label: "Cuidado de Recinto" },
        { valor: "treinamento", label: "Treinamento" }
    ];

    const FREQUENCIAS_OPTIONS = [
        { valor: "diaria", label: "Diária" },
        { valor: "semanal", label: "Semanal" },
        { valor: "mensal", label: "Mensal" }
    ];

    useEffect(() => {
        if (!id) {
            setLoading(false);
            setMessage("ID do cuidado não fornecido.");
            return;
        }

        axios.get(`http://localhost:3000/cuidado/${id}`)
            .then(response => {
                const data = response.data;
                setTipo(data.tipo || "");
                setFrequencia(data.frequencia || "");
                setDescricao(data.descricao || "");
                setLoading(false);
            })
            .catch(error => {
                console.error("Erro ao carregar dados do cuidado:", error);
                setMessage("Erro ao carregar dados para edição.");
                setLoading(false);
            });
    }, [id]);

    async function atualizarCuidado() {
        setMessage(null);
        try {
            await axios.put(`http://localhost:3000/Atualizar-cuidados/${id}`, {
                tipo,
                frequencia,
                descricao
            });
            navigate('/ConsultarCuidados');
        } catch (error) {
            setMessage(`Erro ao atualizar cuidado: ${error.message}`);
            console.error("Erro ao atualizar:", error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        atualizarCuidado();
    };

    if (loading) {
        return <p className="text-center mt-20">Carregando dados para edição...</p>;
    }

    return (
        <>
            <Navbar />
            <section className="bg-cinza-fundo min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-10">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-extrabold text-azul-primario text-center mb-8">
                        Atualizar Tarefa de Cuidado (ID: {id})
                    </h2>

                    {message && (
                        <div className={`text-center p-4 mb-4 text-sm rounded-lg ${message.includes('Erro') ? 'text-red-700 bg-red-100' : 'text-green-700 bg-green-100'}`} role="alert">
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label htmlFor="tipo" className="block text-sm font-medium text-azul-primario">Tipo do Cuidado</label>
                                <select id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-verde-calmo focus:border-verde-calmo bg-white">
                                    {CUIDADO_OPTIONS.map((opcao) => (
                                        <option key={opcao.valor} value={opcao.valor}>{opcao.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="frequencia" className="block text-sm font-medium text-azul-primario">Frequência</label>
                                <select id="frequencia" value={frequencia} onChange={(e) => setFrequencia(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-verde-calmo focus:border-verde-calmo bg-white">
                                    {FREQUENCIAS_OPTIONS.map((opcao) => (
                                        <option key={opcao.valor} value={opcao.valor}>{opcao.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="descricao" className="block text-sm font-medium text-azul-primario">Descrição Detalhada</label>
                            <textarea id="descricao" rows="4" value={descricao} onChange={(e) => setDescricao(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-verde-calmo focus:border-verde-calmo"></textarea>
                        </div>
                        <div className="mt-8 flex justify-end gap-2">
                            <button type="button" onClick={() => navigate('/ConsultarCuidados')} className="inline-flex justify-center py-2 px-6 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition duration-150">
                                Voltar
                            </button>
                            <button type="submit" className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-verde-calmo hover:bg-green-700">
                                Salvar Atualização
                            </button>
                        </div>
                    </form>
                </div>
            </section>
            <Footer />
        </>
    );
}