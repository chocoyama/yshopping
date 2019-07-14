import * as React from 'react'

interface Props {
    query: string
}

const Component: React.FC<Props> = props => (
    <main>search query: { props.query }</main>
);

export default Component;