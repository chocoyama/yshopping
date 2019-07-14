import axios from 'axios'
import {Item} from "../entities/item";
// import * as jsonpAdapter from 'axios-jsonp'

interface Response {
    ResultSet: {
        '0': {}
        totalResultsAvailable: number
        totalResultsReturned: number
    }
}

/*
API Doc: https://developer.yahoo.co.jp/webapi/shopping/shopping/v1/itemsearch.html
*/
export default class SearchRepository {

    static get API_URL() { return 'https://shopping.yahooapis.jp/ShoppingWebService/V1/json/itemSearch' }
    static get APP_ID() { return '' }

    async fetch(query: string) {
        const res = await axios.get<Response>(SearchRepository.API_URL, {
            // adapter: jsonpAdapter,
            params: {
                "appid": SearchRepository.APP_ID,
                // "callback": "cb",
                "query": query
            }
        });
        return this.parse(res.data);
    }

    private parse(data: Response) {
        const totalResultsReturned = data.ResultSet.totalResultsReturned;
        const results = data.ResultSet["0"];

        let items: Item[] = [];
        for (let i = 0; i < totalResultsReturned; i++) {
            const item: Item = results["Result"][`${i}`];
            items.push(item);
        }
        return items
    }
}