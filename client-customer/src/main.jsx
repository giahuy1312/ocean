import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter,Routes,Route,useNavigate } from 'react-router-dom';
import { Header,Footer } from './components/Layout';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import './styles.css';
function AppShell(){const navigate=useNavigate();return <><Header onSearch={keyword=>navigate(keyword?`/san-pham?search=${encodeURIComponent(keyword)}`:'/san-pham')}/><Routes><Route path="/" element={<Home/>}/><Route path="/danh-muc" element={<Categories/>}/><Route path="/san-pham" element={<Products/>}/><Route path="/san-pham/:slug" element={<ProductDetail/>}/><Route path="*" element={<main className="page-wrap empty-state"><h1>404</h1><p>Trang bạn tìm không tồn tại.</p></main>}/></Routes><Footer/></>}
createRoot(document.getElementById('root')).render(<React.StrictMode><BrowserRouter><AppShell/></BrowserRouter></React.StrictMode>);
