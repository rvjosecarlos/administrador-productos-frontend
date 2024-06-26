import axios from "axios";
import { safeParse } from "valibot";
import { DragFormData, Product, ProductsSchema, ProductSchema } from "../types/index";

type ProductData = {
    [k: string]: FormDataEntryValue;
}

async function addProduct( data: ProductData  ){
    try{
        const result = safeParse( DragFormData, {
            name: data.name,
            price: +data.price
        });
        if( result.success ){
            const url = `${import.meta.env.VITE_API_URL}/api/products`;
            await axios.post(url,{
                name: result.output.name,
                price: result.output.price
            });
        }
        else{
            throw new Error('Los datos no tienen el formato correcto');
        }
    }
    catch( error ){
        console.log(error);
    }
};

async function getProducts() {
    try{
        const url = `${import.meta.env.VITE_API_URL}/api/products`;
        const { data } = await axios(url);
        const result = safeParse( ProductsSchema, data.data);
        if( result.success ){
            return result.output;
        }
        throw new Error('Error al realizar la consulta');
    }
    catch(error){
        console.log(error);
    };
};

async function getProductById( id: Product['id'] ) {
    try{
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        const { data } = await axios(url);
        const result = safeParse(ProductSchema, data.data);
        console.log(result);
        if( result.success ){
            return result.output;
        };
        throw new Error('Error al consultar la BD');
    }  
    catch(error){
        console.log(error);
    };
};

async function updateProduct( updateData: ProductData, id: Product['id'] ){
    try{

        const result = safeParse(ProductSchema, {
            id,
            name: updateData.name,
            price: +updateData.price,
            disponibilidad: JSON.parse(updateData.disponibilidad.toString())
        });
        console.log(result);
        if( result.success ){
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
            await axios.put(url, {
                name: result.output.name,
                price: result.output.price,
                disponibilidad: result.output.disponibilidad
            }); 
        };               
    }
    catch(error){
        console.log(error);
    }
};

async function deleteProduct( id: Product['id'] ){
    try{
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        await axios.delete(url);
    }
    catch(error){
        console.log(error)
    }
};

async function updateDisponibilidad( id: Product['id']) {
    try{
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        await axios.patch(url);
    }
    catch(error){
        console.log(error);
    };
};

export { addProduct, getProducts, getProductById, updateProduct, deleteProduct, updateDisponibilidad };