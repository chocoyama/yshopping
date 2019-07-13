import * as React from 'react';
import { Provider } from "react-redux"
import App, {Container, AppContext} from 'next/app';
import withRedux from 'next-redux-wrapper'
import {initStore, ReduxStoreInstance} from "../store";

interface AppProps {
    Component: React.Component
    pagProps: any
    store: ReduxStoreInstance
}

/*
すべてのページコンポーネントで共通する処理
 */
export default withRedux(initStore)(
    class extends App<AppProps> {
        static async getInitialProps({ Component, ctx }: AppContext) {
            const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
            return { pageProps }
        }

        render(): JSX.Element {
            const { Component, pageProps, store } = this.props;

            return (
                <Container>
                    <Provider store={store}>
                        <Component {...pageProps}/>
                    </Provider>
                </Container>
            )
        }
    }
)