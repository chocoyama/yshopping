import * as React from 'react'
import {NextPage, NextPageContext} from "next"
import SearchComponent from '../components/search'
import {search} from "../store/search/actions"
import {useDispatch, useSelector} from "react-redux";
import {selector} from "../store/search";
import {useEffect} from "react";

interface Props {
    userAgent: string
}

const Home: NextPage<Props> = props => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(search(props.userAgent))
    }, [props.userAgent]);

    const query = useSelector(selector);
    return <SearchComponent query={query}/>
};

Home.getInitialProps = async (ctx: NextPageContext) => {
    const userAgent = ctx.req ? ctx.req.headers['user-agent'] : navigator.userAgent;
    return { userAgent }
};

export default Home;
