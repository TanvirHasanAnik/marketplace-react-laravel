import LoginPage from "./components/LoginPage";
import ManageProducts from "./components/manageProducts";
import ProductDetail from "./components/ProductDetail";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import RegisterPage from "./components/RegisterPage";

const routes = [
  { path: "/", label: "Products", element: <ProductList /> },
  { path: "/manage", label: "Manage Products", element: <ManageProducts /> },

  
  { path: "/auth/login", element: <LoginPage />, hidden: true },
  { path: "/auth/register", element: <RegisterPage />, hidden: true },
  { path: "/manage/:id", element: <ProductDetail />, hidden: true },
  { path: "/product/:id", element: <ProductDetail />, hidden: true },
  { path: "/manage/add", element: <ProductForm />, hidden: true },
  { path: "/manage/edit/:id", element: <ProductForm isEdit />, hidden: true },
];

export default routes;
