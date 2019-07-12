import * as React from 'react';
import { NextPage } from 'next';

interface Props {
    userAgent: string;
}

const Component: NextPage<Props> = props => (
    <main>Your user agent: { props.userAgent }</main>
);

export default Component;