import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from "./pages/Home";
import About from './pages/About';
import Footer from './components/Footer';
import Index from './pages/Index';
import Forum from './pages/Forum';
import Dashboard from './pages/Dashboard';
import { RequireAuth } from 'react-auth-kit';

export default function App() {
  return (
    <Router className="App">
        <Routes>
            <Route path='/' element={[<Home/>, <About/>, <Footer/>]}></Route>
            <Route path='/about' element={<About/>}></Route>
            <Route path='/index' element={<RequireAuth loginPath='/'><Index/></RequireAuth>}></Route>
            <Route path='/forum' element={<RequireAuth loginPath='/'><Forum/></RequireAuth>}></Route>
            <Route path='/dashboard' element={<RequireAuth loginPath='/'><Dashboard/></RequireAuth>}></Route>
        </Routes>
    </Router>
  );
}