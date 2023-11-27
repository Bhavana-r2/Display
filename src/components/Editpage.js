import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import './Editpage.css';  // Import the CSS file

const UserList = () => {
  const [lists, setList] = useState([]);
  const [heading, setHeading] = useState('');
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(true);

  useEffect(() => {
    gethead();
  }, []);

  const gethead = async () => {
    const response = await axios.get("http://localhost:5000/landing/heading");
    setList(response.data);
  };

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/landing/heading", {
        heading,
      });
      gethead();
    } catch (error) {
      console.log(error);
    }
  };

  const deletehead = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/landing/heading/${id}`);
      gethead();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    if(!authenticated){
      navigate('/login');
    }
  };

  return (
    <div className="columns mt-5">
      <div className="column is-half">
        {/* Logout button in the header */}
        <div className="header-buttons">
          <button onClick={handleLogout} className="logout-button-header button is-danger">
            Logout
          </button>
        </div>

        {/* Existing code */}

        {/* New Heading and Form */}
        <div className="new-heading-container">
          <h2 className="title">New Heading</h2>
          <form className="new-heading-form" onSubmit={saveUser}>
            <div className="field">
              <div className="control">
                <textarea
                  className="textarea"
                  value={heading}
                  onChange={(e) => setHeading(e.target.value)}
                  placeholder="Enter new heading"
                />
              </div>
            </div>

            <div className="field">
              <div className="control">
                <button type="submit" className="button is-success">Save</button>
              </div>
            </div>
          </form>
        </div>

        {/* Updated Table with Delete Button Styling */}
        <table className="table is-striped is-fullwidth mt-2">
          <thead>
            <tr>
              <th>No</th>
              <th>Heading</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {lists.map((list, index) => (
              <tr key={list._id}>
                <td>{index + 1}</td>
                <td>{list.heading}</td>
                <td>
                  <button
                    onClick={() => deletehead(list._id)}
                    className="delete-button is-small"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
