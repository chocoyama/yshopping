import {Actions} from "../actions"
import {StoreState} from "../index"
import {Item} from "../../entities/item";

interface State {
    keyword: string
    offset: number
    total: number
    items: Item[]
}

export const selector = (state: StoreState) => {
    return {
        keyword: state.search.keyword,
        offset: state.search.offset,
        total: state.search.total,
        items: state.search.items
    }
};

export function initialState(injects?: State): State {
    return {
        keyword: "",
        offset: 0,
        total: 0,
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
                offset: action.payload.items.length,
                total: action.payload.total,
                items: action.payload.items
            };
        case 'SEARCH_PAGING':
            return {
                ...state,
                offset: state.offset + action.payload.items.length,
                total: action.payload.total,
                items: [...state.items, ...action.payload.items]
            };
        default:
            return state
    }
}