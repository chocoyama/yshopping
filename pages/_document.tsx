import * as React from 'react';
import Document, { DocumentContext } from 'next/document';
import DefaultLayout from '../layouts/index';

/*
サーバーサイドのみで実行される共通処理
NextDocumentContextからreq/resなどの情報を取得できる
 */
export default class extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps }
    }

    render(): JSX.Element {
        return <DefaultLayout/>
    }
}