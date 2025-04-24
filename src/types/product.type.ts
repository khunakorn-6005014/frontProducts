///src/types/product.type.ts.
//This file defines the IProductData interface, which provides a type-safe schema
export default interface IProductData {
    _id?: any | null,
    //_id?: string;
    title: string;
    description: string;
    tags?: string[];
    age: number;
    price: number;
}
