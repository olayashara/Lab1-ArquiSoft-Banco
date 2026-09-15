import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export const getCustomers = () => API.get('/customers');
export const createCustomer = (customer) => API.post('/customers', customer);
export const updateCustomer = (id, customer) => API.put(`/customers/${id}`, customer);
export const deleteCustomer = (id) => API.delete(`/customers/${id}`);
export const transferMoney = (data) => API.post('/transactions', data);
export const getTransactionsByAccount = (accountNumber) => API.get(`/transactions/${accountNumber}`);