///src/components/product.component.tsx //Note will will use for update,delete.deteilbyid
import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductDataService from "../services/product.service";
import IProductData from "../types/product.type";

const Product: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Get product ID from route parameters
    const navigate = useNavigate(); // For redirection after deletion

    // State to manage the selected product
    const [currentProduct, setCurrentProduct] = useState<IProductData>({
        _id: "",
        title: "",
        description: "",
        tags: [],
        age: 0,
        price: 0,
    });

    // Fetch product details when the component mounts
    useEffect(() => {
        getProduct(id!);
    }, [id]);
    useEffect(() => {
        console.log("Updated currentProduct:", currentProduct);
    }, [currentProduct]);


    // Fetch product details by ID
    const getProduct = async (id: string): Promise<void> => {
        try {
            const product = await ProductDataService.productDeteil(id); // Fetch product directly
            console.log("Fetched product:", product); // Debug log
            setCurrentProduct(product); // Update state
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    };

    // Handlers for input changes
    const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        const title = event.target.value;
        setCurrentProduct((prevState) => ({ ...prevState, title }));
    };

    const onChangeDescription = (event: ChangeEvent<HTMLInputElement>) => {
        const description = event.target.value;
        setCurrentProduct((prevState) => ({ ...prevState, description }));
    };

    const onChangeTags = (event: ChangeEvent<HTMLInputElement>) => {
        const tags = event.target.value.split(",").slice(0, 3); // Limit to 3 tags
        setCurrentProduct((prevState) => ({ ...prevState, tags }));
    };

    const onChangeAge = (event: ChangeEvent<HTMLInputElement>) => {
        const age = parseInt(event.target.value, 10) || 0;
        setCurrentProduct((prevState) => ({ ...prevState, age }));
    };

    const onChangePrice = (event: ChangeEvent<HTMLInputElement>) => {
        const price = parseFloat(event.target.value) || 0;
        setCurrentProduct((prevState) => ({ ...prevState, price }));
    };
 // Update the product
//  const updateProductOne = () => {
//   const { _id, title, description, tags, age, price } = currentProduct;
//   const updatedProduct: IProductData = { title, description, tags, age, price };

//   ProductDataService.UpdateProduct(_id, updatedProduct)
//       .then((response:any) => {
//           console.log("Product updated successfully:", response.data);
//       })
//       .catch((error) => {
//           console.error("Error updating product:", error);
//       });
// };

const updateProductOne = async (): Promise<void> => {
    try {
        const { _id, title, description, tags, age, price } = currentProduct;
        const updatedProduct: IProductData = { title, description, tags, age, price };

        // Make an API call to update the product
        const response = await ProductDataService.UpdateProduct(_id!, updatedProduct);
        console.log("Product updated successfully:", response.data); // Debug log
        setCurrentProduct(response.data); // Optionally update the state with the updated data
    } catch (error) {
        console.error("Error updating product:", error);
    }
};

// Delete the product
// const deleteProductOne = () => {
//   ProductDataService.deleteProduct(currentProduct._id)
//       .then(() => {
//           console.log("Product deleted successfully!");
//           navigate("/products"); // Redirect to product list
//       })
//       .catch((error) => {
//           console.error("Error deleting product:", error);
//       });
// };
const deleteProductOne = async (): Promise<void> => {
    try {
        await ProductDataService.deleteProduct(currentProduct._id!); // Delete the product using its ID
        console.log("Product deleted successfully!"); // Debug log
        navigate("/products"); // Redirect to product list
    } catch (error) {
        console.error("Error deleting product:", error);
    }
};

return (
    <>
  <div>
      {currentProduct ? (
          <div className="edit-form">
              <h4>Edit Product</h4>
              <form>
                  <div className="form-group">
                      <label htmlFor="title">Title</label>
                      <input
                          type="text"
                          className="form-control"
                          id="title"
                          value={currentProduct.title}
                          onChange={onChangeTitle}
                      />
                  </div>
                  <div className="form-group">
                      <label htmlFor="description">Description</label>
                      <input
                          type="text"
                          className="form-control"
                          id="description"
                          value={currentProduct.description}
                          onChange={onChangeDescription}
                      />
                  </div>
                  <div className="form-group">
                      <label htmlFor="tags">Tags (comma-separated)</label>
                      <input
                          type="text"
                          className="form-control"
                          id="tags"
                          value={currentProduct.tags?.join(",") || ""}
                          onChange={onChangeTags}
                      />
                  </div>
                  <div className="form-group">
                      <label htmlFor="age">Age</label>
                      <input
                          type="number"
                          className="form-control"
                          id="age"
                          value={currentProduct.age}
                          onChange={onChangeAge}
                      />
                  </div>
                  <div className="form-group">
                      <label htmlFor="price">Price</label>
                      <input
                          type="number"
                          className="form-control"
                          id="price"
                          value={currentProduct.price}
                          onChange={onChangePrice}
                      />
                  </div>
              </form>
              <button className="badge badge-danger mr-2" onClick={deleteProductOne}>
                  Delete
              </button>
              <button className="badge badge-success" onClick={updateProductOne}>
                  Update
              </button>
          </div>
      ) : (
          <div>
              <br />
              <p>Please click on a product...</p>
          </div>
      )}
  </div>
</>
);
};

export default Product;

  
  