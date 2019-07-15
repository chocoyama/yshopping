import types from './types'
import {Item} from "../../entities/item";

export function searchFinish(keyword: string, total: number, items: Item[]) {
    return {
        type: types.searchFinish,
        payload: {
            keyword,
            total,
            items
        }
    }
}

export function searchPaging(total: number, items: Item[]) {
    return {
        type: types.searchPaging,
        payload: {
            total,
            items
        }
    }
}