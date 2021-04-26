import React, {ReactElement, useEffect, useState} from 'react'
import io from "socket.io-client";

export enum ApiStatus {
    INITIALIZING,
    CONNECTED,
    DISCONNECTED,
    ERROR,
}

interface ApiContextProps {
    userId: string;
    status: ApiStatus;
}

const ApiContext = React.createContext<ApiContextProps>({userId: "test", status: ApiStatus.INITIALIZING});

export function useApi(): ApiContextProps {
    const context = React.useContext<ApiContextProps>(ApiContext);
    if(!context) {
        throw new Error("useApi must be used within ApiProvider")
    }
    return context;
}

export default function ApiProvider({ children }: {children: ReactElement}) {
    const [status, setStatus] = useState<ApiStatus>(ApiStatus.INITIALIZING);
    useEffect(() => {
        const socket = io('ws://localhost:4433');
        socket.on("connect", () => {
            setStatus(ApiStatus.CONNECTED);
        });
        socket.on("connect_error", (e: Error) => {
            console.log(e);
            setStatus(ApiStatus.ERROR);
        });
        socket.on("disconnect", () => {
            setStatus(ApiStatus.DISCONNECTED);
        });
    });

    const userId = "test";
    return (
        <ApiContext.Provider value={{userId, status}}>
            {children}
        </ApiContext.Provider>
    );
}