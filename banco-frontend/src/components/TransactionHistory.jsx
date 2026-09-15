import React, { useState } from 'react';
import { getTransactionsByAccount } from '../api';

export default function TransactionHistory() {
  const [accountNumber, setAccountNumber] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async e => {
    e.preventDefault();
    try {
      const res = await getTransactionsByAccount(accountNumber.trim());
      setTransactions(res.data);
      setSearched(true);
    } catch (err) {
      console.error("Error consultando historial", err);
    }
  };

  return (
    <div>
      <h2>Histórico de Transacciones</h2>
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', maxWidth: '450px', marginBottom: '25px' }}>
        <input 
          placeholder="Ingrese Número de Cuenta" 
          value={accountNumber} 
          onChange={e => setAccountNumber(e.target.value)} 
          required 
        />
        <button type="submit" className="btn btn-primary">Buscar</button>
      </form>

      {searched && (
        <table className="styled-table">
          <thead>
            <tr>
              <th>ID Movimiento</th>
              <th>Cuenta Origen</th>
              <th>Cuenta Destino</th>
              <th>Monto</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map(t => (
                <tr key={t.id}>
                  <td>#{t.id}</td>
                  <td>{t.senderAccountNumber}</td>
                  <td>{t.receiverAccountNumber}</td>
                  <td style={{ color: '#2e7d32', fontWeight: 'bold' }}>${t.amount.toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="4" style={{ textAlign: 'center', color: '#757575' }}>No se encontraron movimientos para esta cuenta.</td></tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}