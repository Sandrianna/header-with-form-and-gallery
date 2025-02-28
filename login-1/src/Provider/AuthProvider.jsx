import { useContext, useState, createContext, useEffect } from "react";


const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [logIn, setLogIn] = useState(false);

    return(
        <AuthContext.Provider value={{logIn, setLogIn}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext); 