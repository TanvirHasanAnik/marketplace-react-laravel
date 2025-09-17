import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../App.css"; // your styles

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setCurrentImage(0); // start from first image
      });
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const totalImages = product.images?.length || 0;

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  };

  return (
    <div className="product-detail-container">
      {/* Image Slider */}
      <div className="product-image-slider">
        {totalImages > 0 ? (
          <>
            <button className="slider-btn prev" onClick={prevImage}>
              &#10094;
            </button>
            <img
              src={product.images[currentImage]?.url || "https://placehold.co/600x400"}
              alt={product.name}
              className="product-main-image"
            />
            <button className="slider-btn next" onClick={nextImage}>
              &#10095;
            </button>
          </>
        ) : (
          <img
            src="https://placehold.co/600x400"
            alt="No Image"
            className="product-main-image"
          />
        )}
      </div>

      {/* Thumbnails */}
      <div className="thumbnail-row">
        {product.images?.map((img, index) => (
          <img
            key={img.id}
            src={img.url}
            alt={product.name}
            className={`thumbnail ${currentImage === index ? "active" : ""}`}
            onClick={() => setCurrentImage(index)}
          />
        ))}
      </div>

      {/* Product Info */}
      <div className="product-details-info">
        <h3>{product.name}</h3>
        <h2 style={{color: '#0b9704ff'}}>{product.price} BDT</h2>
        <div className="product-details-category">
          <div
            style={{
              display: "inline-block",
              backgroundColor: "#0359d1ff",
              color: "#fff",
              padding: "5px 20px",
              borderRadius: "15px",
              fontSize: "0.9rem",
              fontWeight: "500",
              marginBottom: "10px",
            }}
          >
            <p> {product.category?.name || "Others"}</p>
          </div>
          <div
            style={{
              display: "inline-block",
              backgroundColor: "#043780ff",
              color: "#fff",
              padding: "5px 20px",
              borderRadius: "15px",
              fontSize: "0.9rem",
              fontWeight: "500",
              marginBottom: "10px",
              marginRight: '20px'
            }}
          >
            <p> {product.subcategory?.name || "Others"}</p>
          </div>
        </div>
        <p><b>Description:</b> {product.description || "No description"}</p>
        <p><b>Stock:</b> {product.stock}</p>
      </div>
    </div>
  );
}
