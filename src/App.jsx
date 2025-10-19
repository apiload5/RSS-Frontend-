import React from 'react';

function App() {
  return (
    <div style={{ 
      padding: '50px', 
      textAlign: 'center', 
      fontFamily: 'Arial',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#3b82f6' }}>🚀 RSS Generator Pro</h1>
      <p>If you can see this, React is working!</p>
      <button 
        style={{
          padding: '10px 20px',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
        onClick={() => alert('React is working!')}
      >
        Test Button
      </button>
    </div>
  );
}

export default App;
