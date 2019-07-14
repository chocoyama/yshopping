import types from './types'
import {Item} from "../../entities/item";

export function search(query: string) {
    return {
        type: types.search,
        payload: {
            query
        }
    }
}

export function searchFinish(items: Item[]) {
    return {
        type: types.searchFinish,
        payload: {
            items
        }
    }
}