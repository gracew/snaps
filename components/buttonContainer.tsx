import { ReactNode } from "react";

interface ButtonContainer {
    children: ReactNode;
}

const ButtonContainer = ({ children }: ButtonContainer) => {
    return (
        <div className="my-5 flex flex-col">
            {children}
        </div>
    )
}

export default ButtonContainer;
