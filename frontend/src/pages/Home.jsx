import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="container mx-auto flex justify-center items-center flex-grow py-10 px-4">
            <div className="text-center w-full max-w-4xl">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-azul-primario mb-4">
                        Bem-vindo ao FaunaSYS
                    </h1>
                    <p className="text-lg text-gray-600">
                        Selecione uma das opções abaixo para começar a gerenciar o zoológico.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <button
                        onClick={() => navigate('/ConsultarAnimal')}
                        className="bg-verde-calmo text-white w-full p-6 font-bold rounded-lg shadow-lg hover:bg-green-700 transition-colors duration-300 text-2xl flex items-center justify-center"
                    >
                        Consultar Animal
                    </button>

                    <button
                        onClick={() => navigate('/ConsultarCuidados')}
                        className="bg-azul-primario text-white w-full p-6 font-bold rounded-lg shadow-lg hover:bg-blue-800 transition-colors duration-300 text-2xl flex items-center justify-center"
                    >
                        Consultar cuidados
                    </button>
                </div>
            </div>
        </div>
    );
}