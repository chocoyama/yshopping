import * as React from 'react'
import {NextPage, NextPageContext} from "next"
import ItemGridList from '../components/organisms/ItemGridList'
import {searchFinish} from "../store/search/actions"
import {useDispatch, useSelector} from "react-redux";
import {selector} from "../store/search";
import {useEffect, useState} from "react";
import SearchRepository from "../repositories/search";
import {Item} from "../entities/item";
import SearchBar from "../components/molecules/SearchBar";

interface Props {
    keyword: string
    items: Item[]
}

const Home: NextPage<Props> = props => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(searchFinish(props.keyword, props.items))
    }, [props.items]);

    const [keyword, setKeyword] = useState("");
    const state = useSelector(selector);
    return (
        <>
            <SearchBar
                onChange={keyword => setKeyword(keyword)}
                onSubmit={async () => {
                    const result = await fetch(keyword);
                    dispatch(searchFinish(keyword, result.items))
                }}
            />
            <ItemGridList keyword={state.keyword} items={state.items}/>
        </>
    )
};

Home.getInitialProps = async (ctx: NextPageContext) => fetch("スカート");

async function fetch(keyword: string) {
    const searchRepository = new SearchRepository();
    return await searchRepository.fetch(keyword)
        .then(items => ({ keyword, items }))
}

export default Home;
