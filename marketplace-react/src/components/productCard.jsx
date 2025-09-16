export default function ProductCard({ product,setView,setSelectedProduct}) {
  return (
    <div 
        key={product.id} 
        className="product-card"
        onClick={() => { setSelectedProduct(product); setView("detail"); }}
        >
        <img 
            src={product.image || "https://placehold.co/600x400"} 
            alt={product.name} 
            className="product-image"
        />
        <div className="product-info">
            <h3 className="product-title" style={{ color: "black" }}>{product.name}</h3>
            <div className="product-category-price-wrapper">
                <p className="product-category" style={{ color: "#464544ff" }}>{product.category?.name || "No Category"}</p>
                <p className="product-price" style={{ color: "green" }}>${product.price}</p>
            </div>
        </div>
    </div>
  );
}