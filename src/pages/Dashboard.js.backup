import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard({ onLogout }) {
  const [items, setItems] = useState([]);
  const [newItemText, setNewItemText] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      navigate('/');
    }
  }, [navigate]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://remwastebackend.onrender.com/items');
      setItems(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching items:', error);
      if (error.response && error.response.status === 401) {
        onLogout();
        navigate('/');
      } else {
        setError('Failed to fetch items');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addItem = async () => {
    if (!newItemText.trim()) return;
    try {
      const response = await axios.post('https://remwastebackend.onrender.com/items', { 
        name: newItemText
      });
      setItems([...items, response.data]);
      setNewItemText('');
      setError('');
    } catch (error) {
      console.error('Error adding item:', error);
      setError('Failed to add item');
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`https://remwastebackend.onrender.com/items/${id}`);
      setItems(items.filter(item => item.id !== id));
      setError('');
    } catch (error) {
      console.error('Error deleting item:', error);
      setError('Failed to delete item');
    }
  };

  const startEditing = (item) => {
    setEditingItem(item);
    setEditedText(item.name);
  };

  const saveEdit = async () => {
    if (!editedText.trim()) return;
    try {
      const response = await axios.put(`https://remwastebackend.onrender.com/items/${editingItem.id}`, { 
        name: editedText
      });
      const updatedItems = items.map(item => 
        item.id === editingItem.id ? response.data : item
      );
      setItems(updatedItems);
      setEditingItem(null);
      setEditedText('');
      setError('');
    } catch (error) {
      console.error('Error updating item:', error);
      setError('Failed to update item');
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>RemWaste Dashboard</h2>
        <button 
          onClick={handleLogout} 
          style={{ 
            padding: '8px 16px',
            background: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Sign Out
        </button>
      </div>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

      <div style={{ marginTop: '40px', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={newItemText}
          onChange={e => setNewItemText(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && addItem()}
          placeholder="New item"
          style={{
            flex: 1,
            padding: '8px',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        />
        <button 
          onClick={addItem}
          style={{
            padding: '8px 20px',
            background: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
        {items.map(item => (
          <li key={item.id} style={{ 
            padding: '10px', 
            border: '1px solid #ddd', 
            marginBottom: '10px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            {editingItem && editingItem.id === item.id ? (
              <>
                <input 
                  value={editedText} 
                  onChange={e => setEditedText(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && saveEdit()}
                  style={{
                    flex: 1,
                    padding: '5px',
                    marginRight: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px'
                  }}
                />
                <button 
                  onClick={saveEdit}
                  style={{
                    padding: '5px 15px',
                    background: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginRight: '5px'
                  }}
                >
                  Save
                </button>
                <button 
                  onClick={() => setEditingItem(null)}
                  style={{
                    padding: '5px 15px',
                    background: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span style={{ flex: 1 }}>{item.name}</span>
                <button 
                  onClick={() => startEditing(item)}
                  style={{
                    padding: '5px 15px',
                    background: '#ffc107',
                    color: 'black',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginRight: '5px'
                  }}
                >
                  Edit
                </button>
                <button 
                  onClick={() => deleteItem(item.id)}
                  style={{
                    padding: '5px 15px',
                    background: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>

      {items.length === 0 && (
        <p style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>
          No items yet. Add your first item above!
        </p>
      )}
    </div>
  );
}

export default Dashboard;
