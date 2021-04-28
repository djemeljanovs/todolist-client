import React, {ReactElement, useCallback, useEffect, useState} from 'react'
import io from "socket.io-client";

export enum ApiStatus {
    INITIALIZING= "Initializing",
    CONNECTED= "Connected",
    DISCONNECTED= "Disconnected",
    ERROR = "Connection Error",
}

interface ApiContextProps {
    userId: string;
    status: ApiStatus;
    createItem: () => void,
    focusItem: (id: any) => void,
    blurItem: (id: any) => void,
    updateItem: (id: any, text: string) => void,
    removeItem: (id: any) => void,
    items: TodoItem[];
}

const defaultValue: ApiContextProps = {
    userId: "",
    status: ApiStatus.INITIALIZING,
    createItem: () => ({}),
    focusItem: () => ({}),
    blurItem: () => ({}),
    updateItem: () => ({}),
    removeItem: () => ({}),
    items: [],
};

const ApiContext = React.createContext<ApiContextProps>(defaultValue);

export function useApi(): ApiContextProps {
    const context = React.useContext<ApiContextProps>(ApiContext);
    if(!context) {
        throw new Error("useApi must be used within ApiProvider")
    }
    return context;
}
const socket = io('https://ubiquity-todolist-server.herokuapp.com/');

export type TodoItem = {
    _id: string;
    text: string;
    controlledBy: string;
}

enum EventNames {
    LIST = "item/list",
    CREATE = "item/create",
    FOCUS = "item/focus",
    BLUR = "item/blur",
    UPDATE = "item/update",
    REMOVE = "item/remove",
}

export default function ApiProvider({ children }: {children: ReactElement}) {
    const [status, setStatus] = useState<ApiStatus>(ApiStatus.INITIALIZING);
    const [items, setItems] = useState<TodoItem[]>([]);

    useEffect(() => {
        socket.on("connect", () => {
            setStatus(ApiStatus.CONNECTED);
        });
        socket.on("connect_error", (e: Error) => {
            setStatus(ApiStatus.ERROR);
        });
        socket.on("disconnect", () => {
            setStatus(ApiStatus.DISCONNECTED);
        });
        socket.on(EventNames.LIST, (data: TodoItem[]) => {
            setItems(data);
        });
        socket.on(EventNames.CREATE, (data: TodoItem) => {
            setItems(items => items.concat(data));
        })
        socket.on(EventNames.UPDATE, (data: TodoItem) => {
            console.log("update received: " + JSON.stringify(data));
            setItems(items => {
                const updated = [...items];
                const index = items.findIndex(item => item._id === data._id);
                if(index > -1) {
                    updated[index] = data;
                } else {
                    updated.push(data);
                }
                return updated;
            });
        });
        socket.on(EventNames.REMOVE, (data: TodoItem) => {
            setItems(items => items.filter(item => item._id !== data._id));
        })
    }, []);

    const sendId = useCallback((event: EventNames, id: string) => {
        socket.emit(event, {id});
    }, []);

    const createItem = useCallback(() => {
        socket.emit(EventNames.CREATE);
    }, []);

    const updateItem = useCallback((id: any, text: string) => {
        socket.emit(EventNames.UPDATE, {id, text});
    }, []);

    return (
        <ApiContext.Provider value={{
            userId: socket.id,
            status,
            createItem,
            updateItem,
            focusItem: (id: string) => sendId(EventNames.FOCUS, id),
            blurItem: (id: string) => sendId(EventNames.BLUR, id),
            removeItem: (id: string) => sendId(EventNames.REMOVE, id),
            items,
        }}>
            {children}
        </ApiContext.Provider>
    );
}