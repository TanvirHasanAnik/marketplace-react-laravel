import { useEffect, useState } from "react";

export default function ManageProducts({ setSelectedProduct, setView }) {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    last: 1
  });
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/products?page=${page}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.data || []);
        setPagination({
          current: data.current_page,
          last: data.last_page
        });
        window.scrollTo({ top: 0, behavior: 'auto' }); 
      });
  }, [page]);

  const handleDelete = async (product) => {
    const confirmed = window.confirm(`Are you sure you want to delete "${product.name}"?`);
  if (!confirmed) return;

  try {
    const response = await fetch(`http://127.0.0.1:8000/api/products/${product.id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setProducts(products.filter(p => p.id !== product.id));
      alert(`Product "${product.name}" deleted successfully.`);
    } else {
      alert("Failed to delete the product.");
    }
  } catch (err) {
    console.error(err);
    alert("An error occurred while deleting.");
  }
  };

  return (
    <div>
      <p style={{ textAlign: "left", margin: "15px" }}>Products</p>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#696969ff" }}>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>ID</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Category</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Subcategory</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Price</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Stock</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.id}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.name}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.category?.name || "N/A"}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.subcategory?.name || "N/A"}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>${product.price}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.stock}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <button onClick={() => { setSelectedProduct(product); setView("detail"); }}>View</button>
                <button onClick={() => { setSelectedProduct(product); setView("edit"); }} style={{ marginLeft: "5px" }}>Edit</button>
                <button onClick={() => { handleDelete(product)}} style={{ marginLeft: "5px" }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button 
          onClick={() => setPage(p => Math.max(p - 1, 1))}
          disabled={pagination.current === 1}
          style={{margin:"5px"}}
        >
          Prev
        </button>

        <span>Page {pagination.current} of {pagination.last}</span>

        <button 
          onClick={() => setPage(p => Math.min(p + 1, pagination.last))}
          disabled={pagination.current === pagination.last}
          style={{margin:"5px"}}
        >
          Next
        </button>
    </div>

    </div>
  );
}
