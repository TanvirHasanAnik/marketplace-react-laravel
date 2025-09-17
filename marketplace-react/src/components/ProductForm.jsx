import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductForm({ isEdit }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit && id) {
      fetch(`http://127.0.0.1:8000/api/products/${id}`)
        .then(res => res.json())
        .then(data => {
          setName(data.name || "");
          setPrice(data.price || "");
          setDescription(data.description || "");
        });
    }
  }, [isEdit, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = isEdit ? "PUT" : "POST";
    const url = isEdit
      ? `http://127.0.0.1:8000/api/products/${id}`
      : "http://127.0.0.1:8000/api/products";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price, description }),
      });

      if (response.ok) {
        alert(`Product ${isEdit ? "updated" : "added"} successfully!`);
        navigate("/manage");
      } else {
        alert("Failed to save the product.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while saving the product.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h2>{isEdit ? "Edit Product" : "Add Product"}</h2>
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit" style={{ margin: "20px" }}>
        {isEdit ? "Update" : "Add"}
      </button>
    </form>
  );
}
