import types from './types'
import {Item} from "../../entities/item";

export function searchFinish(keyword: string, items: Item[]) {
    return {
        type: types.searchFinish,
        payload: {
            keyword,
            items
        }
    }
}

export function searchPaging(items: Item[]) {
    return {
        type: types.searchPaging,
        payload: {
            items
        }
    }
}