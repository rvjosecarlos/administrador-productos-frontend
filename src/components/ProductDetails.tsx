import { ActionFunctionArgs, Form, redirect, useFetcher, useNavigate } from "react-router-dom";
import { numberToCurrency } from "../helpers";
import { Product } from "../types";
import { deleteProduct } from "../services/ProductService";

type ProductDetailsProps = {
    producto: Product
}

async function action({params}: ActionFunctionArgs){
    if( params.id ){
        await deleteProduct(+params.id)
    }
    return redirect('/');    
}

function ProductDetails({producto}: ProductDetailsProps){
    const { name, price, disponibilidad } = producto;
    const navigate = useNavigate();
    const fetchForm = useFetcher();
    return (
        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800">
                { name }
            </td>
            <td className="p-3 text-lg text-gray-800">
                { numberToCurrency(price) }
            </td>
            <td className="p-3 text-lg text-gray-800">
                <fetchForm.Form method="POST">
                    <button
                        name="id"
                        value={producto.id}
                        className="border text-xs text-center uppercase font-bold hover:bg-slate-100 p-2 w-full rounded-lg"
                    >
                        { disponibilidad ? 'Disponible' : 'No disponible' }
                    </button>
                </fetchForm.Form>
            </td>
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex gap-2 items-center">
                    <button
                        className="text-white text-xs text-center uppercase font-bold bg-indigo-600 hover:bg-indigo-700 p-2 w-full rounded-lg"
                        onClick={()=> navigate(`/producto/${producto.id}/editar`) }
                    >
                        Editar
                    </button>
                    <Form 
                        method="POST"
                        action={`producto/${producto.id}/eliminar`}
                        className="w-full" 
                        onClick={(e)=> !confirm('¿Desea eliminar el registro?') && e.preventDefault() }                       
                    >
                        <input
                            type="submit"
                            className="text-white text-xs text-center uppercase font-bold bg-red-600 hover:bg-red-700 p-2 w-full rounded-lg cursor-pointer"
                            value="Eliminar"
                        />
                    </Form>
                </div>
            </td>
        </tr> 
    )
};

export default ProductDetails;
export { action };