import * as React from 'react'
import {Item} from "../../entities/item";
import {createStyles, Theme} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
        },
        gridList: {
            // width: 500,
            // height: 450,
        },
        icon: {
            color: 'rgba(255, 255, 255, 0.54)',
        },
    }),
);


interface Props {
    cols: number
    keyword: string
    items: Item[]
}

function ItemGridList(props: Props) {
    const classes = useStyles(props);

    return (
        <div className={classes.root}>
            <GridList cellHeight={180} className={classes.gridList} cols={props.cols}>
                { props.keyword &&
                    <GridListTile key="Subheader" cols={props.cols} style={{height: 'auto'}}>
                        <ListSubheader component="div">{props.keyword} の検索結果</ListSubheader>
                    </GridListTile>
                }
                {props.items.map(item => (
                    <GridListTile key={item.Code}>
                        <img src={item.Image.Medium} alt={item.Name} />
                        <GridListTileBar
                            title={item.Name}
                            subtitle={<span>{item.Description}</span>}
                            actionIcon={
                                <IconButton aria-label={`info about ${item.Name}`} className={classes.icon} href={item.Url}>
                                    <InfoIcon />
                                </IconButton>
                            }
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}

export default ItemGridList;