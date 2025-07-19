import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StreamList from './components/StreamList';
import Cart from './components/Cart';
import About from './components/About';
import TMDBSearch from './components/TMDBSearch';
import Subscriptions from './components/Subscriptions';
import LoginPage from './components/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import { CartContext } from './components/CartContext';
import './style.css';
import CreditCardForm from './components/CreditCardForm';

function App() {
  const { totalItems } = useContext(CartContext);

  return (
    <Router>
      <div>
        <header>
          <h1>EZTechMovie</h1>
          <p>Welcome to EZTechMovie — your personalized streaming list manager.</p>
          <nav id="nav_menu">
            <ul>
              <li><Link to="/">HOME</Link></li>
              <li><Link to="/movies">MOVIES</Link></li>
              <li><Link to="/cart">CART ({totalItems})</Link></li>
              <li><Link to="/about">ABOUT</Link></li>
              <li><Link to="/subscriptions">SUBSCRIPTIONS</Link></li>
            </ul>
          </nav>
        </header>

        <Routes>
          {/* Public route */}
          <Route path="/login" element={<LoginPage onLoginSuccess={() => window.location.href = '/'} />} />

          {/* Grouped private routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<StreamList />} />
            <Route path="/movies" element={<TMDBSearch />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
			<Route path="/checkout" element={<CreditCardForm />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
