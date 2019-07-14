import * as React from 'react'
import {NextPage, NextPageContext} from "next"
import SearchComponent from '../components/search'
import {searchFinish} from "../store/search/actions"
import {useDispatch, useSelector} from "react-redux";
import {selector} from "../store/search";
import {useEffect} from "react";
import SearchRepository from "../repositories/search";
import {Item} from "../entities/item";

interface Props {
    items: Item[]
}

const Home: NextPage<Props> = props => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(searchFinish(props.items))
    }, [props.items]);

    const items = useSelector(selector);
    return <SearchComponent items={items}/>
};

Home.getInitialProps = async (ctx: NextPageContext) => {
    console.log("呼ばれてるよ？");
    const searchRepository = new SearchRepository();
    return await searchRepository.fetch("スカート")
        .then(items => ({ items }))

    // const userAgent = ctx.req ? ctx.req.headers['user-agent'] : navigator.userAgent;
    // return { userAgent }
};

export default Home;
