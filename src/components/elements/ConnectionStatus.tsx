import React from 'react';
import { createUseStyles } from 'react-jss';
import {ApiStatus, useApi} from "../providers/ApiProvider";

const useStyles = createUseStyles<string, { color: string }>({
    status: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    icon: {
        height: 20,
        width: 20,
        borderRadius: "50%",
        background: props => props.color,
        marginRight: 5,
    },
});

function getStatusColor(status: ApiStatus) {
    switch (status) {
        case ApiStatus.INITIALIZING:
            return "yellow";
        case ApiStatus.CONNECTED:
            return "green";
        case ApiStatus.DISCONNECTED:
            return "black";
        case ApiStatus.ERROR:
            return "red";
    }
}
export default function ConnectionStatus() {
    const {status} = useApi();
    const classes = useStyles({color: getStatusColor(status)});
    return (
        <div className={classes.status}>
            <div className={classes.icon} />
            <h4>{ApiStatus[status]}</h4>
        </div>
    )
}