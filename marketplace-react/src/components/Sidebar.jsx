
export default function Sidebar({ setView }) {
  return (
    <div className="sidebar">
      <button onClick={() => setView("all_products")}>Products</button>
      <button onClick={() => setView("manage_products")}>Manage Products</button>
    </div>
  );
}
