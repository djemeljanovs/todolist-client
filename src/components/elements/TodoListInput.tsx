import React, {useEffect, useState} from "react";
import {createUseStyles} from "react-jss";

interface TodoListInputProps {
    isControlled: boolean;
    isControlledByCurrentUser: boolean;
}

const useStyles = createUseStyles<string, TodoListInputProps>({
    root: {
        width: '100%',
        position: 'relative',
        marginRight: 10,
        minWidth: 0,
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
        background: props => props.isControlledByCurrentUser ? '#5071FD' : 'grey',
    },
    input: {
        height: 70,
        width: '100%',
        boxSizing: "border-box",
        border: '3px solid lightgrey',
        borderRadius: 10,
        fontSize: 26,
        background: 'none',
        paddingLeft: 10,
        '&:focus': {
            border: '3px solid #5071FD',
        },
        '&:disabled': {
            background: '#EEEEEE',
            border: '3px solid grey',
        }
    },
});

export default function TodoListInput({
                                          isControlled,
                                          isControlledByCurrentUser,
                                          ...props
}: TodoListInputProps & React.InputHTMLAttributes<HTMLInputElement>) {
    const classes = useStyles({isControlled, isControlledByCurrentUser});
    const [value, setValue] = useState(props.value);

    useEffect(() => {
        setValue(props.value);
    }, [props.value])

    return (
        <div className={classes.root}>
            {isControlled && <div className={classes.badge}>
                {isControlledByCurrentUser ? 'You are editing' : 'Someone else is typing'}
            </div>}
            <input
                maxLength={30}
                type="text"
                className={classes.input}
                placeholder={"Empty item"}
                {...props}
                value={value}
                onChange={event => {
                    if(props.onChange) {
                        props.onChange(event);
                    }
                    setValue(event.target.value);
                }}
            />
        </div>
    )
}