//react-app react-axios-typescript-example/app.tsx
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddProduct from "./components/add-product.component";
import Product from "./components/product.component";
import ProductList from "./components/product-list.component";
//create component still in progresss
// Open src/App.tsx, this App component is the root container for our application, 
// it will contain a navbar, and also, a Switch object with several Route. 
// Each Route points to a React Component.

const App: React.FC = () => {
  return (
    <>
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Shopping
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/api/v1/products"} className="nav-link">
              Products
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
      <Routes>
    <Route path="/" element={<ProductList />} />
    <Route path="/api/v1/products" element={<ProductList />} /> 
    <Route path="/add" element={<AddProduct />} />
    <Route path="/api/v1/products/:id" element={<Product />} />
      </Routes>
      </div>
    </div>
    </>
  );
};

export default App;

