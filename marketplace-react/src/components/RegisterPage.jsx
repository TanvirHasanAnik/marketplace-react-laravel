import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { useRole } from "../context/RoleContext";

// Zod schema for validation
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  password_confirmation: z.string().min(6, "Confirm password must be at least 6 characters"),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords do not match",
  path: ["password_confirmation"],
});

export default function RegisterPage() {
  const { setRole } = useRole();
  const navigate = useNavigate();
  const [apiResponse, setApiResponse] = useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      // 1️⃣ Ensure CSRF cookie is set first
      await fetch("/sanctum/csrf-cookie", {
        method: "GET",
        credentials: "include", // very important
      });

      // 2️⃣ Register the user
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include", // include cookies
      });

      const result = await response.json();

      if (response.ok) {
        setApiResponse({ success: true, message: "Registration successful!", data: result });
        console.log("Success:", result);

        // 3️⃣ Save token in localStorage
        if (result.access_token && result.user) {
          localStorage.setItem("authToken", result.access_token);
          localStorage.setItem("userId", result.user.id);
          localStorage.setItem("userName", result.user.name);
          localStorage.setItem("userRole", result.user.role);

          setRole(result.user.role);
        }

        // 4️⃣ Optionally, wait a tiny bit to ensure Sanctum cookie is usable
        await new Promise((resolve) => setTimeout(resolve, 100));

        // 5️⃣ Navigate to homepage or dashboard
        navigate("/");
      } else {
        setApiResponse({ success: false, message: result.message || "Registration failed" });
        console.log("Error:", result);
      }
    } catch (error) {
      setApiResponse({ success: false, message: "Something went wrong" });
      console.error("Error:", error);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Register Vendor Account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <div className="input-group">
          <label>Name</label>
          <input type="text" {...register("name")} className="input-field" />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        <div className="input-group">
          <label>Email</label>
          <input type="email" {...register("email")} className="input-field" />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div className="input-group">
          <label>Password</label>
          <input type="password" {...register("password")} className="input-field" />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>

        <div className="input-group">
          <label>Confirm Password</label>
          <input type="password" {...register("password_confirmation")} className="input-field" />
          {errors.password_confirmation && <p className="error">{errors.password_confirmation.message}</p>}
        </div>

        <button type="submit" className="login-button">Register</button>
      </form>

      <p
        onClick={() => navigate("/auth/login")}
        style={{ color: "#00798fff", cursor: "pointer", textDecoration: "underline" }}
      >
        Already have an account? Login
      </p>

      {apiResponse && (
        <p style={{ color: apiResponse.success ? "green" : "red", marginTop: "10px" }}>
          {apiResponse.message}
        </p>
      )}
    </div>
  );
}
