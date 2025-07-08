// File: src/components/Subscriptions.js
import React, { useState, useContext } from 'react';
import list from '../data.js'; // import the product list
import { CartContext } from './CartContext';

const Subscriptions = () => {
  const { addToCart } = useContext(CartContext);
  const [warning, setWarning] = useState('');

  const handleAdd = (item) => {
    const result = addToCart(item);
    if (!result.success) {
      setWarning(result.message);
      setTimeout(() => setWarning(''), 3000); // clear warning after 3 sec
    }
  };

  return (
    <main className="subscriptions-container">
      <h2>Subscriptions & Accessories</h2>
      {warning && <div className="subscription-warning">{warning}</div>}

      {list.map((item) => (
        <div key={item.id} className="subscription-card">
          <img src={item.img} alt={item.service} />
          <div className="subscription-details">
            <h4>{item.service}</h4>
            <p>{item.serviceInfo}</p>
            <p>${item.price.toFixed(2)}</p>
            <button onClick={() => handleAdd(item)}>Add to Cart</button>
          </div>
        </div>
      ))}
    </main>
  );
};

export default Subscriptions;
