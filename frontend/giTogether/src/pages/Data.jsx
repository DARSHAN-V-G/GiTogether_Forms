import React, { useState } from 'react';
import axios from 'axios';

const Database = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [eventData, setEventData] = useState([]);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/event/view', {
        name: username,
        password,
      });
      setEventData(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch event data. Please try again.');
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Login to View Events</h2>
      {!eventData.length ? (
        <form onSubmit={handleLogin}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ display: 'block', marginBottom: '10px' }}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ display: 'block', marginBottom: '10px' }}
            />
          </label>
          <button type="submit">Login</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      ) : (
        <div>
          <h3>Event Data</h3>
          {eventData.length > 0 ? (
            <table border="1" style={{ width: '100%', textAlign: 'left' }}>
              <thead>
                <tr>
                  {Object.keys(eventData[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {eventData.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, idx) => (
                      <td key={idx}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No event data available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Database;
