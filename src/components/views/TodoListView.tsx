import React from 'react';
import TodoList from "../elements/TodoList";
import { createUseStyles } from 'react-jss';
import ConnectionStatus from "../elements/ConnectionStatus";
import Button from "../elements/Button";
import {ApiStatus, useApi} from "../providers/ApiProvider";

const useStyles = createUseStyles({
    wrapper: {
        width: 'fit-content',
        maxWidth: 600,
        margin: '0 auto',
        padding: 15,
    },
});

export default function TodoListView() {
    const classes = useStyles();
    const {status, createItem} = useApi();
    return (
        <div className={classes.wrapper}>
            <h2>Multiplayer todo list 🗒️</h2>
            <ConnectionStatus />
            <TodoList />
            <Button disabled={status !== ApiStatus.CONNECTED} onClick={createItem}>New item</Button>
        </div>
    );
}