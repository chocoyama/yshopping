import { Actions } from '../actions'

interface State {
    query: string
}

export function initialState(injects?: State): State {
    return {
        query: "",
        ...injects
    }
}

export function reducer(state = initialState(), action: Actions): State {
    switch (action.type) {
        case 'SEARCH':
            return {
                ...state,
                query: action.payload.query
            };
        default:
            return state
    }
}