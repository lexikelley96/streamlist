import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, totalItems, totalPrice } = useContext(CartContext);
  const isSubscription = (item) => item.service.toLowerCase().includes('subscription');

  return (
    <main className="cart-container">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.img} alt={item.service} width="100" style={{ marginRight: '1rem' }} />
              <div className="cart-details">
                <h4>{item.service}</h4>
                <p>Price: ${item.price.toFixed(2)}</p>

                {!isSubscription(item) ? (
                  <>
                    <label htmlFor={`qty-${item.id}`}>Quantity:</label>
                    <input
                      id={`qty-${item.id}`}
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value, 10);
                        if (!isNaN(newQuantity) && newQuantity >= 1) {
                          updateQuantity(item.id, newQuantity);
                        } else if (e.target.value === '') {
                          updateQuantity(item.id, 1);
                        }
                      }}
                    />
                  </>
                ) : (
                  <p>Quantity: 1 (subscriptions are limited)</p>
                )}
              </div>

              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}

          <hr />
          <div className="cart-summary">
            <h3>Total Items: {totalItems}</h3>
            <h3>Total Price: ${totalPrice.toFixed(2)}</h3>

            <div style={{ marginTop: '1rem' }}>
              <button onClick={() => navigate('/checkout')}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Cart;
