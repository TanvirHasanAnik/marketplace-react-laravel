import { useNavigate } from "react-router-dom";

export default function ProductCard({ product}) {
  const navigate = useNavigate();

  return (
    <div
      key={product.id}
      className="product-card"
      onClick={() => {
        navigate(`/product/${product.id}`, { state: { product } });
      }}
    >
      <img
        src={product.images?.[0]?.url || "https://placehold.co/600x400"}
        alt={product.name}
        className="product-image"
      />

      <div className="product-info">
        <h3 className="product-title" style={{ color: "black" }}>{product.name}</h3>
        <div className="product-category-price-wrapper">
          <p className="product-category" style={{ color: "#515150ff" }}>{product.category?.name || "No Category"}</p>
          <p className="product-price" style={{ color: "#0d9101ff" }}>{product.price} BDT</p>
        </div>
      </div>
    </div>
  );
}
