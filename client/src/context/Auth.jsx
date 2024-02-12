/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect } from 'react';

// Create separate contexts for auth and SellerAuth
const AuthContext = createContext();
const SellerAuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: ""
    });

    const [sellerAuth, setSellerAuth] = useState({
        user: null,
        token: ""
    });

    useEffect(() => {
        const data = localStorage.getItem('auth');
        if (data) {
            const parseData = JSON.parse(data);
            setAuth({
                ...auth,
                user: parseData.user,
                token: parseData.token
            });
        }
    }, []); // Run once on component mount

    useEffect(() => {
        const data = localStorage.getItem('sellerAuth');
        if (data) {
            const parseData = JSON.parse(data);
            setSellerAuth({
                ...sellerAuth,
                user: parseData.user,
                token: parseData.token
            });
        }
    }, []); // Run once on component mount

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            <SellerAuthContext.Provider value={[sellerAuth, setSellerAuth]}>
                {children}
            </SellerAuthContext.Provider>
        </AuthContext.Provider>
    );
};

// Custom hooks for AuthContext
const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

// Custom hooks for SellerAuthContext
const useSellerAuth = () => {
    const context = useContext(SellerAuthContext);
    if (!context) {
        throw new Error("useSellerAuth must be used within a SellerAuthProvider");
    }
    return context;
};

export { useAuth, useSellerAuth, AuthProvider };
