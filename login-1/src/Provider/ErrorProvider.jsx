import { createContext, useContext, useState } from "react";

const ErrorContext = createContext();

export const ErrorProvider = ({children}) => {
    const [errorMessage, setErrorMessage] = useState("");

    return(
        <ErrorContext.Provider value={{errorMessage, setErrorMessage}}>
            {children}
        </ErrorContext.Provider>
    );
};

export const useErrorMessage = () => useContext(ErrorContext);