import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreditCardForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const formatCardNumber = (value) => {
    // Remove non-digit characters and add spaces
    return value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
  };

  const handleChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cardNumber.length === 19) { // 16 digits + 3 spaces
      localStorage.setItem('creditCard', cardNumber);
      setSubmitted(true);
      setTimeout(() => navigate('/'), 2000); // Redirect after success
    } else {
      alert('Please enter a valid 16-digit card number.');
    }
  };

  return (
    <div className="credit-card-form" style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Enter Your Credit Card Info</h2>
      {submitted ? (
        <p>✅ Card saved successfully! Redirecting...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={handleChange}
            maxLength={19}
            style={{ fontSize: '1.2rem', padding: '0.5rem', width: '280px' }}
            required
          />
          <br /><br />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default CreditCardForm;
