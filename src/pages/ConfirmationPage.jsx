import { useLocation, Link } from 'react-router-dom';

function ConfirmationPage() {
  const location = useLocation();
  const { name, phone, total } = location.state || {};

  return (
    <div>
      <h1>Заказ подтверждён!</h1>
      <p>Спасибо, {name}! Ваш заказ на сумму {total} ₽ принят.</p>
      <p>Мы свяжемся с вами по телефону {phone}.</p>
      <Link to="/">Вернуться в каталог</Link>
    </div>
  );
}

export default ConfirmationPage;