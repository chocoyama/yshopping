import axios from 'axios'
import {Item} from "../entities/item";

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

    static get ENDPOINT() { return 'http://localhost:3000/api/items' }

    async fetch(keyword: string, offset: number) {
        const res = await axios.get<Response>(
            SearchRepository.ENDPOINT,
            {
                params: {
                    "query": keyword,
                    "offset": offset
                }
            }
        );
        return this.parse(res.data);
    }

    private parse(data: Response) {
        const totalResultsReturned = data.ResultSet.totalResultsReturned;
        const totalResultsAvailable = data.ResultSet.totalResultsAvailable;
        const results = data.ResultSet["0"];

        let items: Item[] = [];
        for (let i = 0; i < totalResultsReturned; i++) {
            const item: Item = results["Result"][`${i}`];
            items.push(item);
        }
        return { items, totalResultsAvailable }
    }
}