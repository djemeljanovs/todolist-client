import React from 'react';
import {createUseStyles} from "react-jss";
import {TodoItem, useApi} from "../providers/ApiProvider";
import DeleteIcon from "./icons/DeleteIcon";
import Button from "./Button";
import TodoListInput from "./TodoListInput";

type TodoListItemProps = TodoItem;

const useStyles = createUseStyles<string, TodoListItemProps>({
    root: {
        display: 'flex',
    },
});

export default function TodoListItem(props: TodoListItemProps) {
    const {userId, removeItem, focusItem, blurItem, updateItem} = useApi();
    const isControlledByOtherUser = props.controlledBy != null && props.controlledBy !== userId;
    const isControlledByCurrentUser = props.controlledBy != null && props.controlledBy === userId;
    const classes = useStyles(props);

    function onRemove() {
        removeItem(props._id);
    }

    function onFocus() {
        focusItem(props._id);
    }

    function onBlur() {
        blurItem(props._id);
    }

    function onChange(text: string) {
        updateItem(props._id, text);
    }

    return (
        <div className={classes.root}>
            <TodoListInput
                disabled={isControlledByOtherUser}
                value={props.text}
                onChange={event => onChange(event.target.value)}
                onFocus={onFocus}
                onBlur={onBlur}
                isControlled={props.controlledBy != null}
                isControlledByCurrentUser={isControlledByCurrentUser}
            />
            <Button onClick={onRemove} disabled={isControlledByOtherUser} tabIndex={-1}>
                <DeleteIcon width={30} height={30} color={'white'}/>
            </Button>
        </div>
    )
}