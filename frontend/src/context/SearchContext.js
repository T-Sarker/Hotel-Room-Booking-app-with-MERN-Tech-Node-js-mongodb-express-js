import { createContext, useReducer } from 'react'
const INITIAL_STATE = {
    city: '',
    dates: [],
    options: {
        adult: 1,
        children: 0,
        room: 1
    }
}
export const searchContext = createContext(INITIAL_STATE)

const SearchReducer = (state, action) => {

    switch (action.type) {
        case 'NEW_SEARCH':
            console.log(JSON.stringify(action.payload) + " is the state from searchContext")
            return (
                {
                    city: action.payload.destination,
                    dates: action.payload.dates,
                    options: action.payload.optionValue
                });
        case "SEARCH_RESET":
            return INITIAL_STATE
        default:
            return state;
    }
}


export const SearchContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

    return (
        <searchContext.Provider value={{ city: state.city, dates: state.dates, options: state.options, dispatch }}>
            {children}
        </searchContext.Provider>)
}
