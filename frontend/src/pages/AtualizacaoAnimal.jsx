
import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
    nome: yup.string().max(150).required('Nome é obrigatório'),
    especie: yup.string().max(100).required('Espécie é obrigatória'),
    data_nascimento: yup.date().max(new Date(), 'Data não pode ser futura').nullable().transform((v, o) => o === '' ? null : v),
    origem: yup.string().max(100).nullable(),
    habitat: yup.string().max(100).nullable(),
    descricao: yup.string().max(2000).nullable()
}).required();

export default function AtualizacaoAnimal() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { nome: '', especie: '', data_nascimento: '', origem: '', habitat: '', descricao: '' }
    });

    useEffect(() => {
        if (!id) return;
        axios.get(`http://localhost:3000/animais/${id}`)
            .then(response => {
                const data = response.data;
                reset({
                    nome: data.nome || '',
                    especie: data.especie || '',
                    data_nascimento: data.data_nascimento ? String(data.data_nascimento).substring(0, 10) : '',
                    origem: data.origem || '',
                    habitat: data.habitat || '',
                    descricao: data.descricao || ''
                });
            })
            .catch(error => console.error(error));
    }, [id, reset]);

    async function onSubmit(data) {
        try {
            await axios.put(`http://localhost:3000/Atualizar-animais/${id}`, data);
            navigate('/ConsultarAnimal');
        } catch (err) {
            console.error(err);
            alert('Erro ao atualizar o animal');
        }
    }

    return (
        <>
            <Navbar />
            <section className="bg-cinza-fundo min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-10">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-extrabold text-azul-primario text-center mb-8">Atualizar Animal (ID: {id})</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-azul-primario">Nome</label>
                                <input {...register('nome')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
                                <p className="text-sm text-red-600">{errors.nome?.message}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-azul-primario">Espécie</label>
                                <input {...register('especie')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
                                <p className="text-sm text-red-600">{errors.especie?.message}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-azul-primario">Data de Nascimento</label>
                                <input type="date" {...register('data_nascimento')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
                                <p className="text-sm text-red-600">{errors.data_nascimento?.message}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-azul-primario">Local de Origem</label>
                                <input {...register('origem')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-azul-primario">Habitat Natural</label>
                                <input {...register('habitat')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className="block text-sm font-medium text-azul-primario">Observações e Descrição</label>
                            <textarea {...register('descricao')} rows="3" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
                            <p className="text-sm text-red-600">{errors.descricao?.message}</p>
                        </div>

                        <div className="mt-8 flex justify-end gap-2">
                            <button type="button" onClick={() => navigate('/ConsultarAnimal')} className="inline-flex justify-center py-2 px-6 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">Voltar</button>
                            <button type="submit" disabled={isSubmitting} className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-verde-calmo hover:bg-green-700">Salvar Atualização</button>
                        </div>
                    </form>
                </div>
            </section>
            <Footer />
        </>
    );
}