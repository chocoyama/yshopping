import * as React from 'react'
import { NextPage } from "next"
import Component from '../components/index'

interface Props {
    userAgent: string;
}

const Home: NextPage<Props> = props => (
    <Component userAgent={props.userAgent}/>
);

Home.getInitialProps = async ({ req }) => {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
    return { userAgent };
};

export default Home;