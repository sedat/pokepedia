import React, { useEffect, useState } from "react";
import app from "./firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});
    useEffect(() => {
        app.auth().onAuthStateChanged(user => {
            setCurrentUser(user);
        });
    }, []);

    return (
        <AuthContext.Provider
            value={{
                currentUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
