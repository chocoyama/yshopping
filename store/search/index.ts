import {Actions} from "../actions"
import {StoreState} from "../index"

interface State {
    query: string
}

export const selector = (state: StoreState) => ( state.search.query );

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