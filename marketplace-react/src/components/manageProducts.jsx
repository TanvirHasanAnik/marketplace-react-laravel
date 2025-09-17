import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, last: 1 });
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/products?page=${page}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.data || []);
        setPagination({ current: data.current_page, last: data.last_page });
        window.scrollTo({ top: 0, behavior: "auto" });
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
    <div style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
      <p style={{ textAlign: "left" }}>Manage Products</p>
      <button 
        style={{ marginBottom: "15px", color: "#1bac02ff" }}
        onClick={() => navigate("/manage/add")}
      >
        Add New Product
      </button>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#696969ff" }}>
            <th>ID</th><th>Name</th><th>Category</th><th>Subcategory</th>
            <th>Price</th><th>Stock</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.category?.name || "N/A"}</td>
              <td>{product.subcategory?.name || "N/A"}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>
                <button onClick={() => navigate(`/manage/${product.id}`)}>View</button>
                <button onClick={() => navigate(`/manage/edit/${product.id}`)} style={{ marginLeft: "5px" }}>Edit</button>
                <button onClick={() => handleDelete(product)} style={{ marginLeft: "5px", color: "red" }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
