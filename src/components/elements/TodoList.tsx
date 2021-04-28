import React from 'react';
import {createUseStyles} from "react-jss";
import TodoListItem from "./TodoListItem";
import {useApi} from "../providers/ApiProvider";

const useStyles = createUseStyles({
    item: {
        marginBottom: 15,
    },
});

export default function TodoList() {
    const classes = useStyles();
    const {items} = useApi();
    return (
        <>
            {items.map((item, i) => (
                <div className={classes.item} key={`item-${i}`}>
                    <TodoListItem {...item} />
                </div>
            ))}
        </>
    );
}