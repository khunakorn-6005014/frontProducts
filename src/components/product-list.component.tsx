////src/components/product-list.component.tsx
////product-list.component.tsx ////Note will will use for getAllProduct and link to product.compo from edit
//Displays a list of products and their details when selected on left.
//show selected info on right and below link to selected product component for edited
import React, { useState, useEffect } from "react";
import { Link ,useParams} from "react-router-dom";
import ProductDataService from "../services/product.service";
import IProductData from "../types/product.type";

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<IProductData[]>([]);
    const [currentProduct, setCurrentProduct] = useState<IProductData | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(-1);
    const { id } = useParams(); // Get `id` from URL

    // Fetch all products when the component mounts
    // useEffect(() => {
    //     retrieveProducts();
    // }, []);
    useEffect(() => {
        retrieveProducts();
        console.log("Products state updated:", products);
    }, [products]);
    useEffect(() => {
        if (id) {
            fetchProductById(id); // Fetch the product if `id` exists
        }
    }, [id]);
    const fetchProductById = async (productId: string) => {
        try {
            const product = await ProductDataService.productDeteil(productId);
            console.log("Fetched product by ID:", product);
            setCurrentProduct(product);
        } catch (error) {
            console.error("Error fetching product by ID:", error);
        }
    };


    const retrieveProducts = async () => {
        try {
            const response = await ProductDataService.getAllProduct(); // Fetch API data
            console.log("Fetched products:", response); // Debug log
            setProducts(response); // Update state directly since the response is already an array of products
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };


    const setActiveProduct = (product: IProductData, index: number) => {
        console.log("Product selected:", product);
        console.log("Index selected:", index);
        setCurrentProduct(product);
        setCurrentIndex(index);
        
         
    };

    return (
        <div className="list row">
            <div className="col-md-6">
                <h4>Products List</h4>
                <ul className="list-group">
                    {products &&
                        products.map((product: IProductData, index: number) => (
                            <li
                                key={index}
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => {
                                    console.log("Clicked on product:", product);
                                    setActiveProduct(product, index);
                                }}
            
                            >
                                {product.title}
                            </li>
                        ))}
                </ul>
            </div>

            <div className="col-md-6">
                {currentProduct ? (
                    <div>
                        <h4>Product Info</h4>
                        <div>
                            <label>
                                <strong>Title:</strong>
                            </label>{" "}
                            {currentProduct.title}
                        </div>
                        <div>
                            <label>
                                <strong>Description:</strong>
                            </label>{" "}
                            {currentProduct.description}
                        </div>
                        <div>
                            <label>
                                <strong>Tags:</strong>
                            </label>{" "}
                            {currentProduct.tags?.join(", ") || ""}
                        </div>
                        <div>
                            <label>
                                <strong>Price:</strong>
                            </label>{" "}
                            {currentProduct.price}
                        </div>
                        <div>
                            <label>
                                <strong>Age:</strong>
                            </label>{" "}
                            {currentProduct.age}
                        </div>
                        <div>
                             <label>
                              <strong>Product ID:</strong>
                          </label>{" "}
                        {currentProduct?._id || "No ID available"}
                            </div>

                        <Link
                            to={`api/v1/products/${currentProduct._id}`}
                            className="badge badge-warning"
                        >
                            Edit click here
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please select a product</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductList;