import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ConfirmationPage from './pages/ConfirmationPage';
import './index.css';   // ← добавить

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Header />
        <main className="container">
          <Routes>
            <Route path="/" element={<CatalogPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
          </Routes>
        </main>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;