import { createContext, useReducer } from 'react'
const INITIAL_STATE = JSON.parse(localStorage.getItem('searchData')) || {
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


            localStorage.setItem('searchData', JSON.stringify(action.payload))
            return (
                {
                    city: action.payload.city,
                    dates: action.payload.dates,
                    options: action.payload.options
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
