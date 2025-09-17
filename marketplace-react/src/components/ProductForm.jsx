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

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      category_id: 0,
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

  // Update previews when images change
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
    fetch("http://127.0.0.1:8000/api/categories")
      .then(res => res.json())
      .then(data => setCategories(data));

    fetch("http://127.0.0.1:8000/api/subcategories")
      .then(res => res.json())
      .then(data => setAllSubcategories(data));
  }, []);

  // Filter subcategories
  useEffect(() => {
    const filtered = allSubcategories.filter(sub => sub.category_id === Number(selectedCategory));
    setSubcategories(filtered);
    setValue("subcategory_id", null);
  }, [selectedCategory, allSubcategories, setValue]);

  // Fetch product if editing
  useEffect(() => {
    if (isEdit && id) {
      fetch(`http://127.0.0.1:8000/api/products/${id}`)
        .then(res => res.json())
        .then(data => {
          setValue("category_id", data.category_id || 0);
          setValue("subcategory_id", data.subcategory_id || null);
          setValue("name", data.name || "");
          setValue("description", data.description || "");
          setValue("price", data.price?.toString() || "");
          setValue("stock", data.stock?.toString() || "");
          // For edit, optionally handle existing images
          if (data.images && data.images.length > 0) {
            setPreviewImages(data.images.map(img => img.url));
          }
        });
    }
  }, [isEdit, id, setValue]);

  const onSubmit = async (formData) => {
    const method = isEdit ? "PUT" : "POST";
    const url = isEdit ? `/api/products/${id}` : "/api/products";

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("description", formData.description || "");
    payload.append("price", formData.price);
    payload.append("stock", formData.stock);
    payload.append("vendor_id", 1);
    payload.append("category_id", formData.category_id);
    if (formData.subcategory_id) payload.append("subcategory_id", formData.subcategory_id);

    if (formData.images && formData.images.length > 0) {
      Array.from(formData.images).forEach(file => payload.append("images[]", file));
    }

    try {
      const response = await fetch(url, { method, body: payload });
      if (response.ok) {
        alert(`Product ${isEdit ? "updated" : "added"} successfully!`);
        navigate("/manage");
      } else {
        alert("Failed to save the product.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while saving the product.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="product-form" style={{ textAlign: "left" }}>
      <h4>{isEdit ? "Edit Product" : "Add Product"}</h4>

      <div className="select-row">
        <select {...register("category_id", { valueAsNumber: true })}>
          <option value={0}>Select Category</option>
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

      {/* Preview selected images */}
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
