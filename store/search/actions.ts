import types from './types'

export function search(query: string) {
    return {
        type: types.search,
        payload: {
            query
        }
    }
}