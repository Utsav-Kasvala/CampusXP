import { createContext, useContext, useEffect, useReducer } from "react";

// Set up the initial state with safe checks for localStorage
const initialState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    role: localStorage.getItem('role') || null,
    token: localStorage.getItem('token') || null,
    isLoading: false, // Initial loading state
};

export const authContext = createContext(initialState);

// Auth reducer function
const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_START':
            return {
                ...state,
                isLoading: true, // Set loading state
            };

        case "LOGIN_SUCCESS":
            return {
                user: action.payload.user,
                token: action.payload.token,
                role: action.payload.role,
                isLoading: false, // Reset loading state on success
            };

        case 'LOGOUT':
            return {
                user: null,
                role: null,
                token: null,
                isLoading: false, // Reset loading state on logout
            };

        default:
            return state;
    }
};

// Auth Context Provider
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Update local storage whenever state changes
    useEffect(() => {
        if (state.user) {
            localStorage.setItem('user', JSON.stringify(state.user));
            localStorage.setItem('token', state.token);
            localStorage.setItem('role', state.role);
        } else {
            localStorage.removeItem('user'); // Clear user from local storage on logout
            localStorage.removeItem('token'); // Clear token from local storage on logout
            localStorage.removeItem('role'); // Clear role from local storage on logout
        }
    }, [state]);

    return (
        <authContext.Provider value={{
            user: state.user,
            token: state.token,
            role: state.role,
            isLoading: state.isLoading,
            dispatch,
        }}>
            {children}
        </authContext.Provider>
    );
};

// Custom hook for using the auth context
export const useAuth = () => {
    return useContext(authContext);
};
