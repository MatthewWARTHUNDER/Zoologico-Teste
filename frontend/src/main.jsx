import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import CadastroDeAnimal from './pages/CadastroDeAnimal.jsx';
import CadastroCuidados from './pages/CadastroCuidados.jsx';
import GETcuidados from './pages/GETcuidados.jsx';
import GETanimais from './pages/GETanimais.jsx'
import AtualizacaoAnimal from './pages/AtualizacaoAnimal.jsx';
import AtualizacaoCuidados from './pages/AtualizacaoCuidados.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/CadastroAnimal",
    element: <CadastroDeAnimal />
  },
  {
    path: "/CadastroCuidados",
    element: <CadastroCuidados/>
  },
  {
    path: "/ConsultarCuidados",
    element: <GETcuidados/>
  },
  {
    path: "/ConsultarAnimal",
    element: <GETanimais/>
  },
  {
    path: "/AtualizarAnimal/:id",
    element: <AtualizacaoAnimal/>
  },
  {
    path: "/AtualizarCuidado/:id",
    element: <AtualizacaoCuidados/>
  },
  {
    path: "/TelaInicial",
    element: <Home/>
  }


]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);