import * as React from 'react'
import {Item} from "../../entities/item";

interface Props {
    items: Item[]
}

const ItemList: React.FC<Props> = props => {
    return (
        <ul>
            {
                props.items.map(item =>
                    <li key={item.Code}>{item.Name}</li>
                )
            }
        </ul>
    );
};

export default ItemList;