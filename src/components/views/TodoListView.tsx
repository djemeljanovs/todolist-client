import React from 'react';
import { createUseStyles } from 'react-jss';
import ConnectionStatus from "../elements/ConnectionStatus";
import Button from "../elements/Button";
import {ApiStatus, useApi} from "../providers/ApiProvider";
import TodoListItem from "../elements/TodoListItem";

const useStyles = createUseStyles({
    wrapper: {
        width: '100%',
        maxWidth: 600,
        margin: '0 auto',
        padding: 15,
    },
    item: {
        marginBottom: 15,
    },
});

export default function TodoListView() {
    const classes = useStyles();
    const {status, items, createItem} = useApi();
    return (
        <div className={classes.wrapper}>
            <h2>Multiplayer todo list 🗒️</h2>
            <ConnectionStatus />
            <>
                {items.map((item, i) => (
                    <div className={classes.item} key={`item-${i}`}>
                        <TodoListItem {...item} />
                    </div>
                ))}
            </>
            <Button disabled={status !== ApiStatus.CONNECTED} onClick={createItem}>New item</Button>
        </div>
    );
}