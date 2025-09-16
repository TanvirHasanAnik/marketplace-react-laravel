import { useEffect, useState } from "react";

export default function ProductList({ setSelectedProduct, setView }) {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/products?page=${page}`)
      .then(res => res.json())
      .then(data => setProducts(data.data || data)); 
  }, [page]);

  return (
    <div>
      <h2>Products</h2>
      <ul className="product-list">
        {products.map(p => (
          <li key={p.id} onClick={() => { setSelectedProduct(p); setView("detail"); }}>
            {p.name} - ${p.price}
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button onClick={() => setPage(p => Math.max(p - 1, 1))}>Prev</button>
        <span>Page {page}</span>
        <button onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
    </div>
  );
}
