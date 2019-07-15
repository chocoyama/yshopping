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
import Fab from "@material-ui/core/Fab";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        progress: {
            textAlign: "center",
            marginTop: "16px",
            marginBottom: "16px"
        },
        extendedIcon: {
            marginRight: theme.spacing(1),
        },
        fab: {
            position: 'fixed',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
    })
);

interface Props {
    cols: number
    keyword: string
    total: number
    items: Item[]
}

const Home: NextPage<Props> = props => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(searchFinish(props.keyword, props.total, props.items))
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
                    dispatch(searchFinish(keyword, result.total, result.items))
                }}
            />
            <ItemGridList cols={props.cols} keyword={state.keyword} items={state.items}/>
            { state.offset < state.total &&
                <Waypoint onEnter={async () => {
                    const result = await fetch(state.keyword, state.offset);
                    dispatch(searchPaging(result.total, result.items));
                }}/>
            }
            {state.offset < state.total && state.keyword &&
                <div className={classes.progress}>
                    <CircularProgress/>
                </div>
            }
            <Fab
                variant="extended"
                size="small"
                color="primary"
                aria-label="Add"
                className={classes.fab}
                href=""
            >
                {state.total} 件
            </Fab>
        </>
    )
};

Home.getInitialProps = async (ctx: NextPageContext) => {
    const userAgent = ctx.req.headers["user-agent"];
    const isSP = userAgent.match(/(iPhone|iPod|Android.*Mobile)/i) != null;
    const cols = isSP ? 2 : 5;
    return fetch("スカート", 0)
        .then(res => ({ cols, ...res }));
};

async function fetch(keyword: string, offset: number) {
    if (!keyword) return {keyword: '', total: 0, items: []};

    const searchRepository = new SearchRepository();
    return await searchRepository.fetch(keyword, offset)
        .then(result => ({keyword, total: result.totalResultsAvailable, items: result.items}))
}

export default Home;
