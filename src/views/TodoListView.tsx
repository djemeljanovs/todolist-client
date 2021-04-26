import React from 'react';
import TodoList from "../components/elements/TodoList";
import { createUseStyles } from 'react-jss';
import ConnectionStatus from "../components/elements/ConnectionStatus";

const useStyles = createUseStyles({
    wrapper: {
        width: '80%',
        maxWidth: 600,
        margin: '0 auto',
    },
});

export default function TodoListView() {
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            <h2>Multiplayer todo list</h2>
            <ConnectionStatus />
            <TodoList items={[
                {text: 'Milk', id: "a", focusUser: {id: "test", color: "#FF0000", displayName: "Dmitrijs"}},
                {text: 'Potatoes', id: "c"},
                {text: 'Bananas', id: "b", focusUser: {id: "john", color: "#00FF00", displayName: "John"}}
            ]}/>
        </div>
    );
}