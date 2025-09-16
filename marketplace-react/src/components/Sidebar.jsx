
export default function Sidebar({ setView }) {
  return (
    <div className="sidebar">
      <h2>Menu</h2>
      <button onClick={() => setView("list")}>All Products</button>
      <button onClick={() => setView("form")}>Add Product</button>
    </div>
  );
}
