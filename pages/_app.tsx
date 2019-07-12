import * as React from 'react';
import App, { Container, AppContext } from 'next/app';

/*
すべてのページコンポーネントで共通する処理
 */
export default class extends App {
    static async getInitialProps({ Component, ctx }: AppContext) {
        let pageProps = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }
        return { pageProps }
    }

    render(): JSX.Element {
        const { Component, pageProps } = this.props;

        return (
            <Container>
                <Component {...pageProps}/>
            </Container>
        )
    }
}