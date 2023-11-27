import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function LandingPage() {
  const [lists, setList] = useState([]);

  useEffect(() => {
    gethead();
  }, []);

  const gethead = async () => {
    const response = await axios.get("http://localhost:5000/landing/heading");
    setList(response.data);
  };

  return (
    <div>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Link to="/login" className="button is-primary">
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className='heading_list'>
        {lists.map((list) => (
          <p key={list._id} className="marquee-text">{list.heading}</p>
        ))}
      </div>
    </div>
  );
}

export default LandingPage;
