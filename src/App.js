import React, { useState } from 'react';

function App() {
  const [modelo, setModelo] = useState('');
  const [resultado, setResultado] = useState(null);

  const buscarVehiculo = () => {
    setResultado(null);

    fetch(`http://localhost:8080/info/carModel/${modelo}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Vehículo no encontrado');
        }
      })
      .then(data => {
        setResultado(data);
      })
      .catch(error => {
        console.error('Error al buscar el vehículo:', error);
        setResultado({ error: 'Vehículo no encontrado' });
      });
  };

  return (
    <div style={{ padding: '20px', background: '#333', color: 'white' }}>
      <h2>Buscar Vehículo por Modelo</h2>
      <label>
        Modelo:
        <input
          type="text"
          value={modelo}
          onChange={(e) => setModelo(e.target.value)}
        />
      </label>
      <button style={{ background: 'white', color: '#333' }} onClick={buscarVehiculo}>
        Buscar
      </button>

      {resultado && (
        <div style={{ marginTop: '20px' }}>
          <h3>Resultado:</h3>
          {resultado.error ? (
            <p style={{ color: 'red' }}>{resultado.error}</p>
          ) : (
            <table border="1" style={{ width: '100%', background: '#555' }}>
              <thead>
                <tr>
                  {Object.keys(resultado).map((key) => (
                    <th key={key} style={{ background: '#333' }}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {Object.values(resultado).map((value, index) => (
                    <td key={index} style={{ background: '#444' }}>{JSON.stringify(value)}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default App;

