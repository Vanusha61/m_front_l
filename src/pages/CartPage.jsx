import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, total, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div>
        <h1>Корзина</h1>
        <p>Корзина пуста</p>
        <Link to="/">В каталог</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Корзина</h1>
      <table width="100%">
        <thead>
          <tr>
            <th>Товар</th>
            <th>Цена</th>
            <th>Количество</th>
            <th>Сумма</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item.id}>
              <td>
                <Link to={`/product/${item.id}`}>{item.name}</Link>
              </td>
              <td>{item.price} ₽</td>
              <td>
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </td>
              <td>{item.price * item.quantity} ₽</td>
              <td>
                <button onClick={() => removeFromCart(item.id)}>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Итого: {total} ₽</p>
      <div>
        <button onClick={clearCart}>Очистить корзину</button>
        <Link to="/checkout"><button style={{ marginLeft: '10px' }}>Оформить заказ</button></Link>
      </div>
    </div>
  );
}

export default CartPage;