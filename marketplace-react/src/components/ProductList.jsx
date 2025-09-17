import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, last: 1 });
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/products?page=${page}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.data || []);
        setPagination({ current: data.current_page, last: data.last_page });
        window.scrollTo({ top: 0, behavior: "auto" });
      });
  }, [page]);

  return (
    <div>
      <p style={{ textAlign: "left", margin: "15px" }}>Products</p>
      <div className="product-list">
        {products.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className="pagination">
        <button 
          onClick={() => setPage(p => Math.max(p - 1, 1))}
          disabled={pagination.current === 1}
          style={{ margin: "5px" }}
        >
          Prev
        </button>

        <span>Page {pagination.current} of {pagination.last}</span>

        <button 
          onClick={() => setPage(p => Math.min(p + 1, pagination.last))}
          disabled={pagination.current === pagination.last}
          style={{ margin: "5px" }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
