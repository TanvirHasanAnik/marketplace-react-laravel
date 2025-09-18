import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as z from "zod";
import '../App.css';

// Zod schema
const productSchema = z.object({
  category_id: z.number().int().min(1, "Category is required"),
  subcategory_id: z.number().int().optional().nullable(),
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  price: z.string().min(1, "Price must be given").transform(Number),
  stock: z.string().min(1, "Stock must be given").transform(Number),
  images: z.any().optional(),
});

export default function ProductForm({ isEdit }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [allSubcategories, setAllSubcategories] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(true); 

  // Get auth token
  const authToken = localStorage.getItem("authToken");

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      category_id: null,
      subcategory_id: null,
      name: "",
      description: "",
      price: "",
      stock: "",
      images: null
    },
  });

  const selectedCategory = watch("category_id");
  const watchedImages = watch("images");

  // Update image previews
  useEffect(() => {
    if (watchedImages && watchedImages.length > 0) {
      const urls = Array.from(watchedImages).map(file => URL.createObjectURL(file));
      setPreviewImages(urls);
    } else {
      setPreviewImages([]);
    }
  }, [watchedImages]);

  // Fetch categories and subcategories
  useEffect(() => {
    Promise.all([
      fetch("/api/categories").then(res => res.json()).then(data => setCategories(data)),
      fetch("/api/subcategories").then(res => res.json()).then(data => setAllSubcategories(data))
    ]).finally(() => setLoading(false));
  }, []);

  // Filter subcategories based on selected category
  useEffect(() => {
    const filtered = allSubcategories.filter(sub => sub.category_id === Number(selectedCategory));
    setSubcategories(filtered);
    setValue("subcategory_id", null);
  }, [selectedCategory, allSubcategories, setValue]);

  // Fetch product if editing
  useEffect(() => {
    if (isEdit && id) {
      fetch(`/api/products/${id}`)
        .then(res => res.json())
        .then(data => {
          setValue("category_id", data.category_id || null);
          setValue("subcategory_id", data.subcategory_id || null);
          setValue("name", data.name || "");
          setValue("description", data.description || "");
          setValue("price", data.price?.toString() || "");
          setValue("stock", data.stock?.toString() || "");
          if (data.images && data.images.length > 0) {
            setPreviewImages(data.images.map(img => img.url));
          }
        });
    }
  }, [isEdit, id, setValue]);

  // Submit handler
  const onSubmit = async (formData) => {
    if (!authToken) return alert("You are not logged in.");

    const method = isEdit ? "PUT" : "POST";
    const url = isEdit ? `/api/products/${id}` : "/api/products";

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("description", formData.description || "");
    payload.append("price", formData.price);
    payload.append("stock", formData.stock);
    payload.append("category_id", formData.category_id);
    if (formData.subcategory_id) payload.append("subcategory_id", formData.subcategory_id);

    if (formData.images && formData.images.length > 0) {
      Array.from(formData.images).forEach(file => payload.append("images[]", file));
    }

    try {
      const response = await fetch(url, {
        method,
        body: payload,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        alert(`Product ${isEdit ? "updated" : "added"} successfully!`);
        navigate("/manage");
      } else {
        const err = await response.json();
        alert(err.message || "Failed to save the product.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while saving the product.");
    }
  };

  // Conditional rendering inside JSX (no conditional hooks)
  if (!authToken) return <p>Please log in first to add a product.</p>;
  if (loading) return <p>Loading form...</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="product-form" style={{ textAlign: "left" }}>
      <h4>{isEdit ? "Edit Product" : "Add Product"}</h4>

      <div className="select-row">
        <select {...register("category_id", { valueAsNumber: true })} required>
          <option value="">Select Category</option>
          {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
        </select>
        {errors.category_id && <p style={{ color: "red" }}>{errors.category_id.message}</p>}

        <select {...register("subcategory_id", { valueAsNumber: true })}>
          <option value="">Select Subcategory (optional)</option>
          {subcategories.map(sub => <option key={sub.id} value={sub.id}>{sub.name}</option>)}
        </select>
      </div>

      <label>Product Name</label>
      <input type="text" {...register("name")} />
      {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}

      <label>Description</label>
      <textarea {...register("description")} />

      <label>Price</label>
      <input type="text" {...register("price")} />
      {errors.price && <p style={{ color: "red" }}>{errors.price.message}</p>}

      <label>Stock</label>
      <input type="text" {...register("stock")} />
      {errors.stock && <p style={{ color: "red" }}>{errors.stock.message}</p>}

      <label>Upload Images</label>
      <input
        type="file"
        multiple
        onChange={(e) => setValue("images", e.target.files)}
      />

      {previewImages.length > 0 && (
        <div className="image-preview">
          {previewImages.map((src, idx) => (
            <img key={idx} src={src} alt={`Preview ${idx}`} style={{ width: "100px", marginRight: "10px" }} />
          ))}
        </div>
      )}

      <button type="submit" style={{ marginTop: "20px" }}>
        {isEdit ? "Update" : "Add"}
      </button>
    </form>
  );
}
