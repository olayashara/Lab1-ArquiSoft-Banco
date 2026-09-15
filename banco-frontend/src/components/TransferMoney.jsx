import React, { useState } from 'react';
import { transferMoney } from '../api';

export default function TransferMoney() {
  const [form, setForm] = useState({ senderAccountNumber: '', receiverAccountNumber: '', amount: '' });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('Procesando...');
    setIsError(false);

    try {
      const payload = {
        senderAccountNumber: form.senderAccountNumber.trim(),
        receiverAccountNumber: form.receiverAccountNumber.trim(),
        amount: Number(form.amount)
      };

      await transferMoney(payload);
      setMessage('¡Transferencia realizada con éxito!');
      setForm({ senderAccountNumber: '', receiverAccountNumber: '', amount: '' });
    } catch (err) {
      console.error("Error en la transferencia:", err);
      setIsError(true);

      const backendMessage = err.response?.data?.message || err.response?.data;
      if (typeof backendMessage === 'string' && backendMessage.trim() !== '') {
        setMessage(`Error: ${backendMessage}`);
      } else if (err.response?.status === 400) {
        setMessage('Error: Verifique los datos ingresados o el saldo disponible.');
      } else if (err.response?.status === 404) {
        setMessage('Error: Una o ambas cuentas no me pertenecen o no existen.');
      } else {
        setMessage('Error al procesar la transferencia.');
      }
    }
  };

  return (
    <div style={{ maxWidth: '450px', margin: '0 auto' }}>
      <h2>Realizar Transferencia</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Cuenta Origen</label>
          <input name="senderAccountNumber" value={form.senderAccountNumber} onChange={handleChange} placeholder="Ej. 123456789" required />
        </div>
        <div className="form-group">
          <label>Cuenta Destino</label>
          <input name="receiverAccountNumber" value={form.receiverAccountNumber} onChange={handleChange} placeholder="Ej. 987654321" required />
        </div>
        <div className="form-group">
          <label>Monto a transferir ($)</label>
          <input type="number" step="any" name="amount" value={form.amount} onChange={handleChange} placeholder="0.00" required />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
          Confirmar Transferencia
        </button>
      </form>

      {message && (
        <div className={`alert ${isError ? 'alert-error' : 'alert-success'}`}>
          {message}
        </div>
      )}
    </div>
  );
}
