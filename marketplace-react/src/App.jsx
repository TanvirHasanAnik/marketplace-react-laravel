import { useState } from 'react';
import './App.css';
import ProductDetail from "./components/ProductDetail";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import Sidebar from "./components/Sidebar";
import ManageProducts from './components/manageProducts';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [view, setView] = useState("all_products"); 

  return (
    <div className="app-container">
        <div className='top-bar'>
          <h3>Marketplace</h3>
          <h3>Cart</h3>
        </div>
        <div className='content'>
          <Sidebar setView={setView} />
          <div className="main-content">
            {view === "all_products" && (
              <ProductList setSelectedProduct={setSelectedProduct} setView={setView} />
            )}
            
            {view === "manage_products" && (
              <ManageProducts setSelectedProduct={setSelectedProduct} setView={setView} />
            )}


            {view === "detail" && (
              <ProductDetail product={selectedProduct} setView={setView} />
            )}
            {view === "form" && <ProductForm setView={setView} />}
            {view === "edit" && (
              <ProductForm setView={setView} product={selectedProduct} isEdit />
            )}
          </div>

      </div>
    </div>
  );
}

export default App
