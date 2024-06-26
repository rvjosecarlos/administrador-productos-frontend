import { Outlet } from "react-router-dom";

function Layout(){
    return (
        <>
            <header className=" bg-slate-900">
                <div className=" max-w-6xl mx-auto py-10">
                    <h1 className="text-white font-extrabold text-4xl">Administrador de Productos</h1>
                </div>
            </header>
            <main className=" max-w-6xl mx-auto p-10 shadow mt-10 bg-white">
                <Outlet />
            </main>
        </>
    )
}

export default Layout;