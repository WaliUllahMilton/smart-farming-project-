import axios from 'axios';
import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();
const SellerAuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: "",
        _id: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            const data = localStorage.getItem('auth');
            if (data) {
                const parseData = JSON.parse(data);
                setAuth(prevAuth => ({
                    ...prevAuth,
                    user: parseData.user,
                    token: parseData.token,
                    _id: parseData._id
                }));
            }
            await fetchUserData();
        };
        fetchData();
    }, []);

    useEffect(() => {
        localStorage.setItem('auth', JSON.stringify(auth));
    }, [auth]);

    const fetchUserData = async () => {
        try {
            if (auth._id) {
                const response = await axios.get(`http://localhost:8080/api/v1/auth/user/${auth._id}`);
                const userData = response.data;
                setAuth(prevAuth => ({
                    ...prevAuth,
                    user: userData,
                    _id: userData._id
                }));
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

const SellerAuthProvider = ({ children }) => {
    const [sellerAuth, setSellerAuth] = useState({
        user: null,
        token: "",
        _id:""
    });

    useEffect(() => {
        const data = localStorage.getItem('sellerAuth');
        if (data) {
            const parseData = JSON.parse(data);
            setSellerAuth(prevSellerAuth => ({
                ...prevSellerAuth,
                user: parseData.user,
                token: parseData.token
            }));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('sellerAuth', JSON.stringify(sellerAuth));
    }, [sellerAuth]);

    return (
        <SellerAuthContext.Provider value={{ sellerAuth, setSellerAuth }}>
            {children}
        </SellerAuthContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

const useSellerAuth = () => {
    const context = useContext(SellerAuthContext);
    if (!context) {
        throw new Error("useSellerAuth must be used within a SellerAuthProvider");
    }
    return context;
};

export { useAuth, useSellerAuth, AuthProvider, SellerAuthProvider, axios as AxiosInstance };
