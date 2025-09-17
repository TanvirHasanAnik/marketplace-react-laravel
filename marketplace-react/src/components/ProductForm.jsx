import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as z from "zod";

// Zod schema
const productSchema = z.object({
  category_id: z
    .number({ invalid_type_error: "Category is required" })
    .int()
    .min(1, "Category is required"),
  subcategory_id: z
    .number({ invalid_type_error: "Subcategory must be a number" })
    .int()
    .optional()
    .nullable(),
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  price: z
    .number({ invalid_type_error: "Price must be a number" })
    .min(0, "Price must be at least 0"),
  stock: z
    .number({ invalid_type_error: "Stock must be a number" })
    .int()
    .min(0, "Stock cannot be negative"),
});

export default function ProductForm({ isEdit }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [allSubcategories, setAllSubcategories] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      category_id: 0,
      subcategory_id: null,
      name: "",
      description: "",
      price: 0,
      stock: 0,
    },
  });

  const selectedCategory = watch("category_id");

  // Fetch categories and subcategories
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));

    fetch("http://127.0.0.1:8000/api/subcategories")
      .then((res) => res.json())
      .then((data) => setAllSubcategories(data));
  }, []);

  // Filter subcategories based on selected category
  useEffect(() => {
    const filtered = allSubcategories.filter(
      (sub) => sub.category_id === Number(selectedCategory)
    );
    setSubcategories(filtered);
    setValue("subcategory_id", null); // reset subcategory when category changes
  }, [selectedCategory, allSubcategories, setValue]);

  // Fetch product data if editing
  useEffect(() => {
    if (isEdit && id) {
      fetch(`http://127.0.0.1:8000/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setValue("category_id", data.category_id || 0);
          setValue("subcategory_id", data.subcategory_id || null);
          setValue("name", data.name || "");
          setValue("description", data.description || "");
          setValue("price", data.price || 0);
          setValue("stock", data.stock || 0);
        });
    }
  }, [isEdit, id, setValue]);

  const onSubmit = async (formData) => {
    const method = isEdit ? "PUT" : "POST";
    const url = isEdit
      ? `http://127.0.0.1:8000/api/products/${id}`
      : "http://127.0.0.1:8000/api/products";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

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
    <form onSubmit={handleSubmit(onSubmit)} className="product-form">
      <h2>{isEdit ? "Edit Product" : "Add Product"}</h2>
      {errors.vendor_id && <p style={{ color: "red" }}>{errors.vendor_id.message}</p>}

      {/* Category select */}
      <select {...register("category_id", { valueAsNumber: true })}>
        <option value={0}>Select Category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      {errors.category_id && <p style={{ color: "red" }}>{errors.category_id.message}</p>}

      {/* Subcategory select */}
      <select {...register("subcategory_id", { valueAsNumber: true })}>
        <option value="">Select Subcategory (optional)</option>
        {subcategories.map((sub) => (
          <option key={sub.id} value={sub.id}>
            {sub.name}
          </option>
        ))}
      </select>
      {errors.subcategory_id && <p style={{ color: "red" }}>{errors.subcategory_id.message}</p>}

      <input type="text" placeholder="Product Name" {...register("name")} />
      {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}

      <textarea placeholder="Description" {...register("description")} />
      {errors.description && <p style={{ color: "red" }}>{errors.description.message}</p>}

      <input type="number" placeholder="Price" {...register("price", { valueAsNumber: true })} />
      {errors.price && <p style={{ color: "red" }}>{errors.price.message}</p>}

      <input type="number" placeholder="Stock" {...register("stock", { valueAsNumber: true })} />
      {errors.stock && <p style={{ color: "red" }}>{errors.stock.message}</p>}

      <button type="submit" style={{ margin: "20px" }}>
        {isEdit ? "Update" : "Add"}
      </button>
    </form>
  );
}
