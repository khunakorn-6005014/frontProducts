///src/services/product.service.ts.
//Contains the ProductDataService object, which centralizes API logic.
import http from "../http-common";
import IProductData from "../types/product.type";

const ProductDataService = {
    // getAllProduct: async (): Promise<IProductData[]> => {
    //     const response = await http.get<IProductData[]>("/");
    //     return response.data;
    // },
    getAllProduct: async (): Promise<IProductData[]> => {
    try {
        const response = await http.get<IProductData[]>("/");
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;  //GET: /api/v1/products

    }
},



    productDeteil: async (id: string): Promise<IProductData> => {
        const response = await http.get<IProductData>(`/${id}`);
        return response.data; // Extract and return only the data
    },


    // productDeteil: async (id: string): Promise<IProductData> => {
    //     try {
    //         const response = await http.get<IProductData>(`/${id}`);
    //         //const response = await http.get<{ data: IProductData }>(`/${id}`);
    //         return response.data;
    //         // return response;
    //     } catch (error) {
    //         console.error(`Error fetching product with ID ${id}:`, error);
    //         throw error;//GET: /api/v1/products/:id
    //     }
    // },

    createProduct: async (data: IProductData): Promise<IProductData> => {
        try {
            const response = await http.post<IProductData>("/", data);
            return response.data;
        } catch (error) {
            console.error("Error creating product:", error);
            throw error; // POST: /api/v1/products
        }
    },
    UpdateProduct: async (id: string, product: IProductData): Promise<{ data: IProductData }> => {
        const response = await http.patch<{ data: IProductData }>(`/${id}`, product);
        return response.data;
    },

    // UpdateProduct: async (id: string, data: IProductData): Promise<IProductData> => {
    //     try {
    //         const response = await http.patch<IProductData>(`/${id}`, data);
    //         return response.data;
    //     } catch (error) {
    //         console.error(`Error updating product with ID ${id}:`, error);
    //         throw error; //PATCH: /api/v1/products/:id

    //     } 
    // },
    // deleteProduct: async (id: string): Promise<void> => {
    //     await http.delete<void>(`/${id}`);
    // },
    deleteProduct: async (id: string): Promise<void> => {
        try {
            await http.delete<void>(`/${id}`);
        } catch (error) {
            console.error(`Error deleting product with ID ${id}:`, error);
            throw error; //DELETE: /api/v1/products/:id

        }
    },

};

export default ProductDataService;
