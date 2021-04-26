import React, {useState} from 'react';
import {createUseStyles} from "react-jss";
import TodoListItem, {TodoListItemProps} from "./TodoListItem";
import Button from "./Button";

type TodoListProps = {
    items: TodoListItemProps[];
}
const useStyles = createUseStyles({
    list: {
        textAlign: 'right',
    },
    item: {
        marginBottom: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default function TodoList(props: TodoListProps) {
    const classes = useStyles();
    const [items, setItems] = useState(props.items);
    function onAdd() {
        setItems([...items].concat({id: 'new', text: ''}));
    }
    return (
        <div className={classes.list}>
            <div>
                {items.map((item, i) => (
                    <div className={classes.item} key={`item-${i}`}>
                        <TodoListItem {...item} />
                    </div>
                ))}
            </div>
            <Button onClick={onAdd}>New item</Button>
        </div>
    );
}