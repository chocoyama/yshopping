import React from 'react';
import Document, {DocumentContext, Head, Main, NextScript} from 'next/document';
import { ServerStyleSheets } from '@material-ui/styles';

/*
サーバーサイドのみで実行される共通処理
NextDocumentContextからreq/resなどの情報を取得できる
 */
export default class extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const sheets = new ServerStyleSheets();
        const originalRenderPage = ctx.renderPage;

        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: App => props => sheets.collect(<App {...props}/>)
            });

        const initialProps = await Document.getInitialProps(ctx);

        return {
            ...initialProps,
            styles: [
                <React.Fragment key="styles">
                    {initialProps.styles}
                    {sheets.getStyleElement()}
                </React.Fragment>
            ]
        }
    }

    render(): JSX.Element {
        return (
            <html lang="ja">
                <Head>
                    <meta charSet="utf-8"/>
                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
                    />
                    {/*<meta name="theme-color" content={theme.palette.primary.main}/>*/}
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    />
                    <title>YShopping</title>
                </Head>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </html>
        )
    }
}