import { useState } from 'react';
import './App.css';
import ProductDetail from "./components/ProductDetail";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import Sidebar from "./components/Sidebar";

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [view, setView] = useState("list"); 

  return (
    <div className="app-container">
      <Sidebar setView={setView} />
      <div className="main-content">
        {view === "list" && (
          <ProductList setSelectedProduct={setSelectedProduct} setView={setView} />
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
  );
}

export default App
