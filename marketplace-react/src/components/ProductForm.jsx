import { useState } from "react";

export default function ProductForm({ setView, product, isEdit }) {
  const [name, setName] = useState(product?.name || "");
  const [price, setPrice] = useState(product?.price || "");
  const [description, setDescription] = useState(product?.description || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = isEdit ? "PUT" : "POST";
    const url = isEdit
      ? `http://127.0.0.1:8000/api/products/${product.id}`
      : "http://127.0.0.1:8000/api/products";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price, description }),
    });

    setView("list");
  };

  const handleDelete = async () => {
    await fetch(`http://127.0.0.1:8000/api/products/${product.id}`, {
      method: "DELETE",
    });
    setView("list");
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
      <button type="submit">{isEdit ? "Update" : "Add"}</button>
      {isEdit && <button type="button" onClick={handleDelete}>Delete</button>}
    </form>
  );
}
