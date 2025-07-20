import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode'; // This line requires the package to be installed

// Create the context object
const AuthContext = createContext();

// Create a custom hook to make consuming the context easier
export const useAuth = () => {
    return useContext(AuthContext);
}

// Create the Provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Start as true to check for token on initial load

    // Function to save the token to localStorage
    const storeToken = (token) => {
        localStorage.setItem('authToken', token);
    };

    // Function to check for a stored token, verify it, and update the user state
    const authenticateUser = () => {
        const storedToken = localStorage.getItem('authToken');

        if (storedToken) {
            try {
                // Decode the token to get the user payload (e.g., { _id, name, ... })
                // This does NOT verify the token's signature, but it's safe for reading the payload on the client.
                // The backend verifies the signature on every protected API call.
                const decodedToken = jwtDecode(storedToken);
                
                // Here you might add a check for token expiration if needed, but for simplicity we'll omit it.
                
                setUser(decodedToken);
            } catch (error) {
                // If the token is malformed, clear the state and remove it
                setUser(null);
                localStorage.removeItem('authToken');
            }
        } else {
            // If there's no token, ensure user is null
            setUser(null);
        }
        
        // We're done checking, so set loading to false
        setIsLoading(false);
    };

    // Function to handle user logout
    const logoutUser = () => {
        localStorage.removeItem('authToken');
        // Re-run authentication logic, which will now set the user to null
        authenticateUser(); 
    };

    // On initial component mount, run authenticateUser once to check for a lingering session
    useEffect(() => {
        authenticateUser();
    }, []);

    // The value object holds all the state and functions that will be available to consumers
    const value = {
        user,
        isLoading,
        storeToken,
        authenticateUser,
        logoutUser
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};