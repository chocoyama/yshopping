import * as React from 'react';

interface Props {
    userAgent: string;
}

const Component: React.FC<Props> = props => (
    <main>Your user agent: { props.userAgent }</main>
);

export default Component;