import {Actions} from "../actions"
import {StoreState} from "../index"
import {Item} from "../../entities/item";

interface State {
    keyword: string
    items: Item[]
}

export const selector = (state: StoreState) => {
    return {
        keyword: state.search.keyword,
        items: state.search.items
    }
};

export function initialState(injects?: State): State {
    return {
        keyword: "",
        items: [],
        ...injects
    }
}

export function reducer(state = initialState(), action: Actions): State {
    switch (action.type) {
        case 'SEARCH_FINISH':
            return {
                ...state,
                keyword: action.payload.keyword,
                items: action.payload.items
            };
        default:
            return state
    }
}