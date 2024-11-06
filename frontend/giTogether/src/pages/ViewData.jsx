import React, { useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const columns = [
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'roll_no', headerName: 'Roll No', width: 100 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'phn_no', headerName: 'Phone', width: 130 },
  { field: 'department', headerName: 'Department', width: 150 },
  { field: 'year', headerName: 'Year', width: 90 },
];

const paginationModel = { page: 0, pageSize: 5 };

const Database = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [eventData, setEventData] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/event/view`, {
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

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = eventData.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div style={styles.container}>
      
      {!eventData.length ? (
        <>
        <h2 style={styles.header}>Login to View Events</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <label style={styles.label}>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </label>
          <button type="submit" style={styles.button}>Login</button>
          {error && <p style={styles.error}>{error}</p>}
        </form>
        </>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Search events"
            value={searchQuery}
            onChange={handleSearch}
            style={styles.searchBar}
          />
          <h3 style={styles.subHeader}>Event Data</h3>
          <Paper sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={filteredData.map((row, index) => ({ id: index + 1, ...row }))}
              columns={columns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              sx={{ border: 0 }}
            />
          </Paper>
        </div>
      )}
    </div>
  );
};

// Styles for the component
const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  label: {
    color: '#555',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
    width: '100%',
    marginBottom: '10px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  searchBar: {
    marginBottom: '20px',
    padding: '12px',
    width: '100%',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
  subHeader: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#333',
    margin: '10px 0',
  },
};

export default Database;
