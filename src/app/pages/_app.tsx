import * as React from 'react';
import { Provider } from "react-redux"
import App, {Container, AppContext} from 'next/app';
import withRedux from 'next-redux-wrapper'
import {initStore, ReduxStoreInstance} from "../store";
import CssBaseline from '@material-ui/core/CssBaseline';

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

        componentDidMount(): void {
            const jssStyles = document.querySelector('#jss-server-side');
            if (jssStyles) {
                jssStyles.parentNode.removeChild(jssStyles);
            }
        }

        render(): JSX.Element {
            const { Component, pageProps, store } = this.props;

            return (
                <Container>
                    <Provider store={store}>
                        <CssBaseline/>
                        <Component {...pageProps}/>
                    </Provider>
                </Container>
            )
        }
    }
)