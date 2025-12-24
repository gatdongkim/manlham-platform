import React, { createContext, useContext, useState, useEffect } from "react";
import http from "../api/http"; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const recoverSession = () => {
            const token = localStorage.getItem('skilllink_token');
            const storedUser = localStorage.getItem('skilllink_user');

            if (token && storedUser) {
                try {
                    setUser(JSON.parse(storedUser));
                } catch (error) {
                    logout(); 
                }
            }
            setLoading(false);
        };
        recoverSession();
    }, []);

    // ✅ Registration Handler
    const register = async (signupData) => {
        try {
            const response = await http.post('/auth/register', signupData);
            return response.data; 
        } catch (err) {
            throw err; 
        }
    };

    /**
     * ✅ UPDATED Login Handler
     * Since Login.jsx already performs the API call, this function
     * should just handle saving the user and token to state/storage.
     */
    const login = (userData, token) => {
        if (!userData || !token) return false;

        try {
            localStorage.setItem('skilllink_token', token);
            localStorage.setItem('skilllink_user', JSON.stringify(userData));
            setUser(userData);
            return true;
        } catch (err) {
            console.error("Storage error:", err);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('skilllink_token');
        localStorage.removeItem('skilllink_user');
        window.location.replace('/login'); 
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            login, 
            register, 
            logout, 
            isAuthenticated: !!user,
            loading,
            role: user?.role?.toUpperCase() || null
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);