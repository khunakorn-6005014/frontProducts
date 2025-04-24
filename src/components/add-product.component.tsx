////src/components/add-product.component.tsx 
// //Note make form to create new and add in group
import React, { useState, ChangeEvent } from "react";
import ProductDataService from "../services/product.service";
import IProductData from "../types/product.type";

const AddProduct: React.FC = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [age, setAge] = useState(0);
    const [price, setPrice] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    // Individual handlers for each field
    const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const onChangeDescription = (event: ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const onChangeTags = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.split(",").slice(0, 3); // Limit to 3 tags
        setTags(value);
    };

    const onChangeAge = (event: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10) || 0;
        setAge(value);
    };

    const onChangePrice = (event: ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value) || 0;
        setPrice(value);
    };

    // Save product to the backend
    const saveProduct = () => {
        const product: IProductData = { title, description, tags, age, price };

        ProductDataService.createProduct(product)
            .then((response:any) => {
                setSubmitted(true);
                console.log("Product added successfully!", response.data);
            })
            .catch((error) => {
                console.error("Error adding product:", error);
            });
    };

    // Reset form for a new product
    const newProduct = () => {
        setTitle("");
        setDescription("");
        setTags([]);
        setAge(0);
        setPrice(0);
        setSubmitted(false);
    };

    return (
        <>
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newProduct}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            required
                            value={title}
                            onChange={onChangeTitle}
                            name="title"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            required
                            value={description}
                            onChange={onChangeDescription}
                            name="description"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="age">Age</label>
                        <input
                            type="number"
                            className="form-control"
                            id="age"
                            required
                            value={age}
                            onChange={onChangeAge}
                            name="age"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="tags">Tags (comma-separated, max 3)</label>
                        <input
                            type="text"
                            className="form-control"
                            id="tags"
                            value={tags.join(",")}
                            onChange={onChangeTags}
                            name="tags"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input
                            type="number"
                            className="form-control"
                            id="price"
                            required
                            value={price}
                            onChange={onChangePrice}
                            name="price"
                        />
                    </div>

                    <button onClick={saveProduct} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
        </>
    );
};

export default AddProduct;
