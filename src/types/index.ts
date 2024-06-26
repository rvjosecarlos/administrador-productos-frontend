import { object, string, number, boolean, array, InferInput } from "valibot";

const DragFormData = object({
    name: string(),
    price: number()
});

const ProductSchema = object({
    id: number(),
    name: string(),
    price: number(),
    disponibilidad: boolean()
});

const ProductsSchema = array(ProductSchema);

export type Product = InferInput<typeof ProductSchema>

export { DragFormData, ProductSchema, ProductsSchema };