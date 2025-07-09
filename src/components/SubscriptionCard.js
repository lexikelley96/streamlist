import React from 'react';

const SubscriptionCard = ({ item, onAddToCart }) => {
  return (
    <div key={item.id} className="subscription-card">
      <img src={item.img} alt={item.service} />
      <div className="subscription-details">
        <h4>{item.service}</h4>
        <p>{item.serviceInfo}</p>
        <p>${item.price.toFixed(2)}</p>
        <button onClick={() => onAddToCart(item)}>Add to Cart</button>
      </div>
    </div>
  );
};

export default SubscriptionCard;
