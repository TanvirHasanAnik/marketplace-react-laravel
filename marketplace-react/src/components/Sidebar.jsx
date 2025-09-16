
export default function Sidebar({ setView }) {
  return (
    <div className="sidebar">
      <button onClick={() => setView("list")}>All Products</button>
      <button onClick={() => setView("form")}>Add Product</button>
    </div>
  );
}
