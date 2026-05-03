import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function CheckoutPage() {
  const { cartItems, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь мог бы быть отправка на сервер, но пока просто имитируем
    clearCart();
    navigate('/confirmation', { state: { name, phone, total } });
  };

  if (cartItems.length === 0) {
    return <p>Корзина пуста. <a href="/">Вернуться в каталог</a></p>;
  }

  return (
    <div>
      <h1>Оформление заказа</h1>
      <h3>Ваш заказ:</h3>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>{item.name} × {item.quantity} = {item.price * item.quantity} ₽</li>
        ))}
      </ul>
      <p>Итого: {total} ₽</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Имя: </label>
          <input value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div>
          <label>Телефон: </label>
          <input value={phone} onChange={e => setPhone(e.target.value)} required />
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>Подтвердить заказ</button>
      </form>
    </div>
  );
}

export default CheckoutPage;