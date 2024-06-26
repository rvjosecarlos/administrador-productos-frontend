import { Link, Form, ActionFunctionArgs, LoaderFunctionArgs, useActionData, redirect, useLoaderData } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { getProductById, updateProduct } from "../services/ProductService";
import { Product } from "../types";

async function loader({ params }: LoaderFunctionArgs) {
    console.log(params);
    if( params.id ){
        const producto = await getProductById(+params.id);
        return producto ? producto : redirect('/');
    };
}

async function action({ request, params }: ActionFunctionArgs){
    const data = Object.fromEntries(await request.formData());
    if( Object.values(data).includes('') ){
        const error = 'Todos los campos son requeridos';
        return error;
    };
    console.log('actualizar');
    if( params.id ){
        await updateProduct( data, +params.id );
        return redirect('/');
    };
};

const availabilityOptions = [
    { name: 'Disponible', value: true},
    { name: 'No Disponible', value: false}
 ]

function EditProduct(){

    const error = useActionData() as string;
    const producto = useLoaderData() as Product;

    return (
        <>
            <div className="flex justify-between">
                <h2 className=" text-4xl text-slate-600 font-extrabold">Editar Producto</h2>
                <Link
                    className="bg-indigo-600 p-3 rounded text-white font-bold text-sm shadow-sm hover:bg-indigo-700"
                    to="/"
                >
                    Volver a Productos
                </Link>
            </div>

            { error && <ErrorMessage>{error}</ErrorMessage> }

            <Form
                className="mt-10"
                method="POST"      
            >
            
                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="name"
                    >Nombre Producto:</label>
                    <input 
                        id="name"
                        type="text"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        placeholder="Nombre del Producto"
                        name="name"
                        defaultValue={producto.name}
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="price"
                    >Precio:</label>
                    <input 
                        id="price"
                        type="number"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        placeholder="Precio Producto. ej. 200, 300"
                        name="price"
                        defaultValue={producto.price}
                    />
                </div>  
                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="availability"
                    >Disponibilidad:</label>
                    <select 
                        id="availability"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        name="disponibilidad"
                        defaultValue={producto.disponibilidad.toString()}
                    >
                        {availabilityOptions.map(option => (
                        <option key={option.name} value={option.value.toString()}>{option.name}</option>
                        ))}
                    </select>
                </div>
                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Registrar Producto"
                />
            </Form>
        </>
    )
};

export default EditProduct;
export { action, loader };