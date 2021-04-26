import React from 'react';
import {createUseStyles} from "react-jss";

type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const useStyles = createUseStyles<string, ButtonProps>({
    button: {
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        padding: 20,
        background: props => props.disabled ? 'lightgrey' : '#5071FD',
        border: 'none',
        fontSize: 24,
        fontWeight: 'bold',
        width: 'fit-content',
        borderRadius: 10,
        textTransform: 'uppercase',
        userSelect: "none",
        cursor: 'pointer',
    }
});


export default function Button(props: ButtonProps) {
    const classes = useStyles(props);
    return <button className={classes.button} {...props}>{props.children}</button>;
}