import {Actions} from "../actions"
import {StoreState} from "../index"
import {Item} from "../../entities/item";

interface State {
    query: string
    items: Item[]
}

export const selector = (state: StoreState) => ( state.search.items );

export function initialState(injects?: State): State {
    return {
        query: "",
        items: [],
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
        case 'SEARCH_FINISH':
            return {
                ...state,
                items: action.payload.items
            };
        default:
            return state
    }
}