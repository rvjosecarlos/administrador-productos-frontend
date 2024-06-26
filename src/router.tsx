import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Products, { loader as productLoader, action as productDisponibilidadAction } from "./views/Products";
import NewProduct, { action as newProductAction } from "./views/NewProduct";
import EditProduct, { action as editProductAction, loader as editProductLoader } from "./views/EditProduct";
import { action as deleteProductAction } from "./components/ProductDetails";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Products />,
                loader: productLoader,
                action: productDisponibilidadAction
            },
            {
                path: 'producto/nuevo',
                element: <NewProduct />,
                action: newProductAction
            },
            {
                path: 'producto/:id/editar',
                element: <EditProduct />,
                action: editProductAction,
                loader: editProductLoader
            },
            {
                path: 'producto/:id/eliminar',
                action: deleteProductAction
            }
        ]
    }
]);