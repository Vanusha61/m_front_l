import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import products from '../data/products';

function CatalogPage() {
  const { addToCart, cartItems } = useCart();

  const getInCartQty = (productId) => {
    const item = cartItems.find((i) => i.id === productId);
    return item ? item.quantity : 0;
  };

  const handleAddToCart = (product, e) => {
    e.preventDefault(); // чтобы не переходить по ссылке
    if (product.stock > 0) {
      addToCart(product, 1);
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: '2rem', margin: '20px 0' }}>Каталог ламп</h1>
      <div className="catalog-grid">
        {products.map((product) => {
          const inCart = getInCartQty(product.id);
          const isMax = inCart >= product.stock;

          return (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.name} />
              </Link>
              <div className="info">
                <h3>
                  <Link to={`/product/${product.id}`}>{product.name}</Link>
                </h3>
                {/* Краткое описание */}
                <p style={{ color: '#4b5563', fontSize: '0.9rem', marginBottom: '8px' }}>
                  {product.description?.length > 80
                    ? product.description.substring(0, 80) + '…'
                    : product.description}
                </p>
                {/* Теги */}
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '10px' }}>
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        background: '#f3f4f6',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        color: '#374151',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="price">{product.price} ₽</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
                  <Link to={`/product/${product.id}`} className="details-btn" style={{ marginRight: '8px' }}>
                    Подробнее
                  </Link>
                  <button
                    className="add-to-cart"
                    style={{
                      padding: '10px 16px',
                      fontSize: '0.9rem',
                      whiteSpace: 'nowrap',
                      opacity: isMax ? 0.6 : 1,
                    }}
                    disabled={isMax}
                    onClick={(e) => handleAddToCart(product, e)}
                  >
                    {isMax ? 'В корзине' : 'В корзину'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CatalogPage;