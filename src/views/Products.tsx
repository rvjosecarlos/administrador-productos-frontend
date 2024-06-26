import { ActionFunctionArgs, Link, useLoaderData } from "react-router-dom";
import { getProducts, updateDisponibilidad } from "../services/ProductService";
import ProductDetails from "../components/ProductDetails";
import type { Product } from "../types";

async function loader(){
    const products = await getProducts();
    return products;
};

async function action({request}: ActionFunctionArgs){
    const { id } = Object.fromEntries(await request.formData());
    if( id ){
        await updateDisponibilidad(+id);
    }
    return null;
};

function Products(){
    const products = useLoaderData() as Product[];

    return (
        <>
            <div className="flex justify-between">
                <h2 className=" text-4xl text-slate-600 font-extrabold">Productos</h2>
                <Link
                    className="bg-indigo-600 p-3 rounded text-white font-bold text-sm shadow-sm hover:bg-indigo-700"
                    to="/producto/nuevo"
                >
                    Agregar Producto
                </Link>
            </div>

            <div className="p-2">
                <table className="w-full mt-5 table-auto">
                    <thead className="bg-slate-800 text-white">
                        <tr>
                            <th className="p-2">Producto</th>
                            <th className="p-2">Precio</th>
                            <th className="p-2">Disponibilidad</th>
                            <th className="p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map( producto => 
                                <ProductDetails 
                                    key={producto.id}
                                    producto={producto} 
                                />)
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
};

export default Products;
export { loader, action };