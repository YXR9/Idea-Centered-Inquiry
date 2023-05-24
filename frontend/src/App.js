import './App.css';
import Home from "./pages/Home";
import About from './pages/About';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="App">
      <Home />
      <About />
      <Footer />
    </div>
  );
}