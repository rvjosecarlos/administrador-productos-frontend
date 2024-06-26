import { PropsWithChildren } from "react";

function ErrorMessage({ children }: PropsWithChildren){
    return (
        <div className="bg-red-700 text-white font-bold text-md p-3 rounded mt-5 text-center">
            { children }
        </div>
    )
};

export default ErrorMessage;