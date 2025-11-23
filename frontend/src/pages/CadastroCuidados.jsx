
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function CadastroCuidados() {
    const navigate = useNavigate(); 
    const [tipo, setTipo] = useState("alimentacao");
    const [descricao, setDescricao] = useState("");
    const [frequencia, setFrequencia] = useState("diaria");
    const [message, setMessage] = useState("");

    const CUIDADO_OPTIONS = [
        { valor: "alimentacao", label: "Alimentação" },
        { valor: "Cuidado Veterinário", label: "Cuidado Veterinário e de Saúde" },
        { valor: "recinto", label: "Cuidado de Recinto" },
        { valor: "treinamento", label: "Treinamento" }
    ];

    const FREQUENCIAS_OPTIONS = [
        { valor: "diaria", label: "Diária" },
        { valor: "semanal", label: "Semanal" },
        { valor: "mensal", label: "Mensal" }
    ];

    useEffect(() => {
        console.log(tipo, descricao, frequencia);
    }, [tipo, descricao, frequencia]);

    async function salvarCuidado() {
        setMessage(""); 

        try {
            await axios.post("http://localhost:3000/CadastrarCuidado", { tipo, descricao, frequencia });
            setMessage("Cuidado registrado com sucesso!");
            navigate(-1);
            
        } catch (error) {
            setMessage("Erro ao registrar cuidado");
            console.error(error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        salvarCuidado();
    };

    return (
        <>
            <Navbar/>
            <section className="bg-cinza-fundo min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-10">
                
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-extrabold text-azul-primario text-center mb-8">
                        Registro de Tarefa de Cuidado
                    </h2>

                    {message && (
                        <div className={`text-center p-4 mb-4 text-sm rounded-lg ${
                            message.includes('Erro') ? 'text-red-700 bg-red-100' : 'text-green-700 bg-green-100'
                        }`} role="alert">
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label htmlFor="tipo" className="block text-sm font-medium text-azul-primario">
                                    Tipo do Cuidado
                                </label>
                                <select
                                    id="tipo"
                                    value={tipo}
                                    onChange={(e) => setTipo(e.target.value)}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-verde-calmo focus:border-verde-calmo bg-white"
                                >
                                    {CUIDADO_OPTIONS.map((opcao) => (
                                        <option key={opcao.valor} value={opcao.valor}>
                                            {opcao.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="frequencia" className="block text-sm font-medium text-azul-primario">
                                    Frequência
                                </label>
                                <select
                                    id="frequencia"
                                    value={frequencia}
                                    onChange={(e) => setFrequencia(e.target.value)}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-verde-calmo focus:border-verde-calmo bg-white"
                                >
                                    {FREQUENCIAS_OPTIONS.map((opcao) => (
                                        <option key={opcao.valor} value={opcao.valor}>
                                            {opcao.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="descricao" className="block text-sm font-medium text-azul-primario">
                                Descrição Detalhada e Instruções
                            </label>
                            <textarea
                                id="descricao"
                                rows="4"
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-verde-calmo focus:border-verde-calmo"
                            ></textarea>
                        </div>

                        <div className="mt-8 flex justify-end gap-2">
                            <button type="button" onClick={() => navigate('/ConsultarCuidados')} className="inline-flex justify-center py-2 px-6 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition duration-150">
                                Voltar
                            </button>
                            <button
                                type="submit"
                                className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-verde-calmo hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-verde-calmo transition duration-150"
                            >
                                Salvar Cuidado
                            </button>
                        </div>
                    </form>
                </div>
            </section>
            <Footer/>
        </>
    );
}
