import Navbar from './components/Navbar';
import Footer from './components/Footer'
import  Home  from './pages/Home';


export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-cinza-fundo">
      <Navbar />
      <Home/>
      <Footer />
    </div>
  );
}

