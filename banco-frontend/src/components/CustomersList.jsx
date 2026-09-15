import React, { useEffect, useState } from 'react';
import { getCustomers, updateCustomer, deleteCustomer } from '../api';

export default function CustomersList() {
  const [customers, setCustomers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ firstName: '', lastName: '', accountNumber: '', balance: '' });

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = () => {
    getCustomers()
      .then(res => setCustomers(res.data))
      .catch(err => console.error("Error al cargar clientes", err));
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este cliente?")) {
      try {
        await deleteCustomer(id);
        loadCustomers();
      } catch (err) {
        alert("Error al eliminar el cliente.");
      }
    }
  };

  const handleEditClick = (customer) => {
    setEditingId(customer.id);
    setEditForm({
      firstName: customer.firstName,
      lastName: customer.lastName,
      accountNumber: customer.accountNumber,
      balance: customer.balance
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSaveUpdate = async (id) => {
    try {
      await updateCustomer(id, { ...editForm, balance: Number(editForm.balance) });
      setEditingId(null);
      loadCustomers();
    } catch (err) {
      alert("Error al actualizar el cliente.");
    }
  };

  return (
    <div>
      <h2>Directorio de Clientes</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Nº Cuenta</th>
            <th>Saldo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              {editingId === c.id ? (
                <>
                  <td><input name="firstName" value={editForm.firstName} onChange={handleEditChange} /></td>
                  <td><input name="lastName" value={editForm.lastName} onChange={handleEditChange} /></td>
                  <td><input name="accountNumber" value={editForm.accountNumber} onChange={handleEditChange} /></td>
                  <td><input type="number" step="any" name="balance" value={editForm.balance} onChange={handleEditChange} /></td>
                  <td>
                    <button className="btn btn-primary" onClick={() => handleSaveUpdate(c.id)}>Guardar</button>
                    <button className="btn btn-secondary" onClick={() => setEditingId(null)} style={{ marginLeft: '5px' }}>Cancelar</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{c.firstName}</td>
                  <td>{c.lastName}</td>
                  <td>{c.accountNumber}</td>
                  <td><strong>${c.balance.toLocaleString()}</strong></td>
                  <td>
                    <button className="btn btn-primary" onClick={() => handleEditClick(c)}>Editar</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(c.id)} style={{ marginLeft: '8px' }}>Eliminar</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}