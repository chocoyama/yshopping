import * as React from 'react'
import {NextPage, NextPageContext} from "next"
import ItemList from '../components/organisms/ItemList'
import {searchFinish} from "../store/search/actions"
import {useDispatch, useSelector} from "react-redux";
import {selector} from "../store/search";
import {useEffect, useState} from "react";
import SearchRepository from "../repositories/search";
import {Item} from "../entities/item";
import SearchBar from "../components/molecules/SearchBar";

interface Props {
    items: Item[]
}

const Home: NextPage<Props> = props => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(searchFinish(props.items))
    }, [props.items]);

    const [query, setQuery] = useState("");
    const items = useSelector(selector);
    return (
        <>
            <SearchBar
                onChange={query => setQuery(query)}
                onSubmit={async () => {
                    const result = await fetch(query);
                    dispatch(searchFinish(result.items))
                }}
            />
            <ItemList items={items}/>
        </>
    )
};

Home.getInitialProps = async (ctx: NextPageContext) => {
    console.log("呼ばれてるよ？");
    return fetch("スカート")
};

async function fetch(query: string) {
    const searchRepository = new SearchRepository();
    return await searchRepository.fetch(query)
        .then(items => ({ items }))
}

export default Home;
