import React, {ChangeEvent} from 'react';
import {createUseStyles} from "react-jss";
import {TodoItem, useApi} from "../providers/ApiProvider";
import DeleteIcon from "./icons/DeleteIcon";
import Button from "./Button";
import TodoListInput from "./TodoListInput";
import {debounce} from "../../utils/debounce";

type TodoListItemProps = TodoItem;

const useStyles = createUseStyles<string, TodoListItemProps>({
    root: {
        display: 'flex',
        width: '100%',
    },
});

export default function TodoListItem(props: TodoListItemProps) {
    const {userId, removeItem, focusItem, blurItem, updateItem} = useApi();
    const isControlled = props.controlledBy != null;
    const isControlledByOtherUser = isControlled && props.controlledBy !== userId;
    const isControlledByCurrentUser = isControlled && props.controlledBy === userId;
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

    function onChange(event: ChangeEvent<HTMLInputElement>) {
        updateItem(props._id, event.target.value);
    }

    return (
        <div className={classes.root}>
            <TodoListInput
                disabled={isControlledByOtherUser}
                value={props.text}
                onChange={debounce(onChange, 1000)}
                onFocus={onFocus}
                onBlur={onBlur}
                isControlled={isControlled}
                isControlledByCurrentUser={isControlledByCurrentUser}
            />
            <Button onClick={onRemove} disabled={isControlledByOtherUser} tabIndex={-1}>
                <DeleteIcon width={30} height={30} color={'white'}/>
            </Button>
        </div>
    )
}