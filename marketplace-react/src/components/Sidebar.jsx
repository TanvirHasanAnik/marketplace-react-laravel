export default function Sidebar({ setView, currentView }) {
  const tabs = [
    { label: "Products", view: "all_products" },
    { label: "Manage Products", view: "manage_products" }
  ];

  return (
    <div className="sidebar">
      {tabs.map(tab => (
        <button
          key={tab.view}
          onClick={() => setView(tab.view)}
          style={{
            padding: "10px 20px",
            marginBottom: "10px",
            cursor: "pointer",
            backgroundColor: currentView === tab.view ? "#ddd" : "#3a3a3aff",
            color: currentView === tab.view ? "#000" : "#fff",
            border: "none",
            borderRadius: "5px",
            textAlign: "left",
            width: "100%"
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
