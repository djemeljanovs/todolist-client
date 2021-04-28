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

const StatusColors: Record<ApiStatus, string> = {
    [ApiStatus.INITIALIZING]: "yellow",
    [ApiStatus.CONNECTED]: "green",
    [ApiStatus.DISCONNECTED]: "black",
    [ApiStatus.ERROR]: "red"
}

const StatusLabels: Record<ApiStatus, string> = {
    [ApiStatus.INITIALIZING]: "Connecting",
    [ApiStatus.CONNECTED]: "Connected",
    [ApiStatus.DISCONNECTED]: "Disconnected",
    [ApiStatus.ERROR]: "Connection Error"
}

export default function ConnectionStatus() {
    const {status} = useApi();
    const classes = useStyles({color: StatusColors[status]});
    return (
        <div className={classes.status}>
            <div className={classes.icon} />
            <h4>{StatusLabels[status].toUpperCase()}</h4>
        </div>
    )
}