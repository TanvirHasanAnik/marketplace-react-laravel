
export default function ProductDetail({ product }) {
  if (!product) return <p>No product selected</p>;

  return (
    <div>
      <h2>{product.name}</h2>
      <p><b>Price:</b> ${product.price}</p>
      <p><b>Description:</b> {product.description}</p>
    </div>
  );
}
