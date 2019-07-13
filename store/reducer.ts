import { combineReducers } from "redux"
import * as Search from './search'

export function initialState() {
    return {
        search: Search.initialState()
    }
}

export const reducer = combineReducers({
    search: Search.reducer
});
