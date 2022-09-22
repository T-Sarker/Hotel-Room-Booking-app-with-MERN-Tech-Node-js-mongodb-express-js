import { createContext, useEffect, useReducer } from "react"

const INITIAL_VALUE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null
}

export const AuthContext = createContext(INITIAL_VALUE)

const AuthReducer = (state, action) => {

    switch (action.type) {

        case 'LOGIN_START':
            return {
                user: null,
                loading: true,
                error: null
            }

        case 'LOGIN_FAILED':
            return {
                user: null,
                loading: false,
                error: action.payload
            }

        case 'LOGIN_SUCCESS':
            return {
                user: action.payload,
                loading: false,
                error: null
            }

        case 'LOGOUT':
            return {
                user: null,
                loading: false,
                error: null
            }

        default:
            break;
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_VALUE)

    useEffect(() => {
        if (state.user != null) {

            localStorage.setItem('user', JSON.stringify(state.user))

        }
    }, [state.user])


    return <AuthContext.Provider value={{ user: state.user, loading: state.loading, error: state.error, dispatch }}>
        {children}
    </AuthContext.Provider>
}