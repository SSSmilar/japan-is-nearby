import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Catalog from './pages/Catalog';
import './App.css';
import { LanguageProvider } from './contexts/LanguageContext';
import { CartProvider } from './contexts/CartContext';

function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/catalog" element={<Catalog />} />
          </Routes>
        </Router>
      </CartProvider>
    </LanguageProvider>
  );
}

export default App;