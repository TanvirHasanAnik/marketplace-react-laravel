import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { useRole } from "../context/RoleContext";

// Zod schema for validation
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const { setRole } = useRole();
  const navigate = useNavigate();
  const [apiResponse, setApiResponse] = useState(null); 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), 
      });

      const result = await response.json();

      if (response.ok) {
        setApiResponse({ success: true, message: "Login successful!", data: result });
        console.log("Success:", result);

        if (result.access_token && result.user) {
            localStorage.setItem("authToken", result.access_token);
            localStorage.setItem("userId", result.user.id);
            localStorage.setItem("userName", result.user.name);
            localStorage.setItem("userRole", result.user.role);

            setRole(result.user.role)
        }
        navigate("/");
      } else {
        setApiResponse({ success: false, message: result.message || "Login failed" });
        console.log("Error:", result);
      }
    } catch (error) {
      setApiResponse({ success: false, message: "Something went wrong" });
      console.error("Error:", error);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
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

        <button type="submit" className="login-button">
          Login
        </button>
      </form>

        <p 
            onClick={() => navigate('/auth/register')}
            style={{ color: '#00798fff', cursor: 'pointer', textDecoration: 'underline' }}
        >Register vendor account</p>

      {apiResponse && (
        <p style={{ color: apiResponse.success ? "green" : "red", marginTop: "10px" }}>
          {apiResponse.message}
        </p>
      )}
    </div>
  );
}
