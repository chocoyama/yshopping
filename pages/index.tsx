import * as React from 'react'
import {NextPage, NextPageContext} from "next"
import ItemGridList from '../components/organisms/ItemGridList'
import {searchFinish, searchPaging} from "../store/search/actions"
import {useDispatch, useSelector} from "react-redux";
import {selector} from "../store/search";
import {useEffect, useState} from "react";
import SearchRepository from "../repositories/search";
import {Item} from "../entities/item";
import SearchBar from "../components/molecules/SearchBar";
import {Waypoint} from "react-waypoint";
import {CircularProgress, createStyles, Theme} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        progress: {
            textAlign:  "center",
            marginTop: "16px",
            marginBottom: "16px"
        }
    })
);

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

    const classes = useStyles(props);
    return (
        <>
            <SearchBar
                onChange={keyword => setKeyword(keyword)}
                onSubmit={async () => {
                    const result = await fetch(keyword, 0);
                    dispatch(searchFinish(keyword, result.items))
                }}
            />
            <ItemGridList keyword={state.keyword} items={state.items}/>
            <Waypoint onEnter={ async () => {
                const result = await fetch(state.keyword, state.offset);
                dispatch(searchPaging(result.items));
            }}/>
            <div className={classes.progress}>
                <CircularProgress/>
            </div>
        </>
    )
};

Home.getInitialProps = async (ctx: NextPageContext) => fetch("スカート", 0);

async function fetch(keyword: string, offset: number) {
    if (!keyword) return { keyword: '', items: [] };

    const searchRepository = new SearchRepository();
    return await searchRepository.fetch(keyword, offset)
        .then(items => ({ keyword, items }))
}

export default Home;
