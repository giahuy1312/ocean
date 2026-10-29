import axios from 'axios';
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', timeout: 10000 });
export const getCategories = () => api.get('/categories?active=true').then(r => r.data.data);
export const getProducts = (params = {}) => api.get('/products', { params }).then(r => r.data);
export const getProduct = (slug) => api.get(`/products/${slug}`).then(r => r.data.data);
export default api;
