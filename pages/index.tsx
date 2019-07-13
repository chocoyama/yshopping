import * as React from 'react'
import {NextPage, NextPageContext} from "next"
import Component from '../components/index'

interface Props {
    userAgent: string;
}

const Home: NextPage<Props> = props => (
    <Component userAgent={props.userAgent}/>
);

Home.getInitialProps = async (ctx: NextPageContext) => {
    const userAgent = ctx.req ? ctx.req.headers['user-agent'] : navigator.userAgent;
    return { userAgent };
};

export default Home;