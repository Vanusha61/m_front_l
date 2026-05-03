import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Header() {
  const { itemsCount } = useCart();
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">Магазин лампочек</Link>
        <Link to="/cart" className="cart-link">
          🛒 Корзина <span>{itemsCount}</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;