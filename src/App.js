import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StreamList from './components/StreamList';
import Movies from './components/Movies';
import Cart from './components/Cart';
import About from './components/About';
import TMDBSearch from './components/TMDBSearch'; // Import new component
import './style.css';

function App() {
  return (
    <Router>
      <div>
        <header>
          <h1>EZTechMovie</h1>
          <p>Welcome to EZTechMovie — your personalized streaming list manager.</p>
          <nav id="nav_menu">
            <ul>
              <li><Link to="/">HOME</Link></li>
              <li><Link to="/movies">MOVIE</Link></li>
              <li><Link to="/cart">CART</Link></li>
              <li><Link to="/about">ABOUT</Link></li>
              <li><Link to="/search">SEARCH</Link></li> {/* New link for TMDBSearch */}
            </ul>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<StreamList />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<TMDBSearch />} /> {/* New route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
