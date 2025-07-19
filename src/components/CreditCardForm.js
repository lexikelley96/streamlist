import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from './CartContext';

const CreditCardForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const { clearCart } = useContext(CartContext);


  const formatCardNumber = (value) => {
    return value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
  };

  const handleChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cardNumber.length === 19) {
      localStorage.setItem('creditCard', cardNumber);
	  clearCart();
      setSubmitted(true);
      setTimeout(() => navigate('/'), 2000);
    } else {
      alert('Please enter a valid 16-digit card number.');
    }
  };

  return (
    <main className="credit-form-wrapper">
      <div className="credit-form">
        <h2>Enter Your Credit Card Info</h2>
        {submitted ? (
          <p className="success-message"> Card saved successfully! Redirecting...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={handleChange}
              maxLength={19}
              required
            />
            <br />
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </main>
  );
};

export default CreditCardForm;
