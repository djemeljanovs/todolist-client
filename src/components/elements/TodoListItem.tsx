import React, {useState} from 'react';
import {createUseStyles} from "react-jss";
import {useApi} from "../providers/ApiProvider";
import DeleteIcon from "./icons/DeleteIcon";
import Button from "./Button";

type TodoListUserProps = {
    id: string;
    displayName: string;
    color: string;
}

export type TodoListItemProps = {
    id: string;
    text: string;
    focusUser?: TodoListUserProps;
}

const useStyles = createUseStyles<string, TodoListItemProps>({
    root: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    badge: {
        position: 'absolute',
        top: -25,
        left: 10,
        color: 'white',
        zIndex: 100,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        padding: 5,
    },
    badgeOwn: {
        background: '#5071FD',
    },
    badgeOther: {
        background: 'grey',
    },
    input: {
        height: 50,
        borderRadius: 10,
        fontSize: 26,
        border: '3px solid lightgrey',
        background: 'none',
        padding: 5,
        paddingLeft: 15,
        marginRight: 10,
        '&:focus': {
            border: '3px solid #5071FD',
        },
        '&:disabled': {
            background: '#EEEEEE',
            border: '3px solid grey',
        }
    },
});

export default function TodoListItem(props: TodoListItemProps) {
    const {userId} = useApi();
    const isControlledByOtherUser = props.focusUser && props.focusUser.id !== userId;
    const [isFocused, setIsFocused] = useState(false);
    const [value, setValue] = useState(props.text);
    const classes = useStyles(props);

    function onRemove() {
    }

    return (
        <div className={classes.root}>
            {
                isFocused && <div className={`${classes.badge} ${classes.badgeOwn}`}>
                    You are editing
                </div>
            }
            {
                isControlledByOtherUser && <div className={`${classes.badge} ${classes.badgeOther}`}>
                    {props.focusUser?.displayName} is editing
                </div>
            }
            <input
                className={classes.input}
                value={value}
                disabled={isControlledByOtherUser}
                onChange={e => setValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                placeholder={"Empty item"}
                onBlur={() => setIsFocused(false)}
            />
            {!isControlledByOtherUser && <Button onClick={onRemove}>
                <DeleteIcon width={30} height={30} color={'white'}/>
            </Button>}
        </div>
    )
}