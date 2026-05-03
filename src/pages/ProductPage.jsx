import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import products from '../data/products';
import { useCart } from '../context/CartContext';

function ProductPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const { addToCart, cartItems } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) return <h2>Товар не найден</h2>;

  const alreadyInCart = cartItems.find(item => item.id === product.id)?.quantity || 0;
  const maxAvailable = product.stock - alreadyInCart;

  const increase = () => {
    if (quantity < maxAvailable) setQuantity(quantity + 1);
  };
  const decrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  const handleAdd = () => {
    if (quantity > maxAvailable) return;
    addToCart(product, quantity);
    setQuantity(1);
  };

  // Похожие товары: все, кроме текущего
  const relatedProducts = products.filter(p => p.id !== product.id);

  return (
    <div>
      <Link to="/" style={{ display: 'inline-block', marginTop: '20px', color: '#f97316', fontWeight: 500 }}>
        ← Назад в каталог
      </Link>

      <div className="product-page">
        <img src={product.image} alt={product.name} />

        <div className="info">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <div className="stock">В наличии: {product.stock} шт.</div>
          {alreadyInCart > 0 && (
            <div style={{ color: '#6b7280', fontSize: '0.95rem' }}>
              Уже в корзине: {alreadyInCart} шт.
            </div>
          )}
          <div className="price">{product.price} ₽</div>

          {maxAvailable <= 0 ? (
            <p style={{ color: '#ef4444', fontWeight: 500 }}>
              Невозможно добавить: товар полностью в корзине
            </p>
          ) : (
            <>
              <div className="cart-actions">
                <button onClick={decrease} disabled={quantity <= 1}>−</button>
                <span>{quantity}</span>
                <button onClick={increase} disabled={quantity >= maxAvailable}>+</button>
                <button className="add-to-cart"
                  onClick={handleAdd}
                  disabled={quantity > maxAvailable}
                >
                  Добавить в корзину
                </button>
              </div>
              {quantity >= maxAvailable && (
                <p style={{ color: '#d97706', marginTop: '8px' }}>
                  Вы выбрали максимум доступного
                </p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Секция похожих товаров */}
      <div style={{ marginTop: '50px' }}>
        <h2 style={{ marginBottom: '16px' }}>Похожие товары</h2>
        <div className="related-scroll">
          {relatedProducts.map(item => (
            <div key={item.id} className="related-card">
              <Link to={`/product/${item.id}`}>
                <img src={item.image} alt={item.name} />
                <div className="related-card-info">
                  <h4>{item.name}</h4>
                  <p className="price">{item.price} ₽</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;