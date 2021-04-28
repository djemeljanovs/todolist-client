import React, {ReactElement, useCallback, useEffect, useState} from 'react'
import io from "socket.io-client";

enum ApiEvent {
    LIST = "item/list",
    CREATE = "item/create",
    FOCUS = "item/focus",
    BLUR = "item/blur",
    UPDATE = "item/update",
    REMOVE = "item/remove",
}

export enum ApiStatus {
    INITIALIZING,
    CONNECTED,
    DISCONNECTED,
    ERROR,
}

export type TodoItem = {
    _id: string;
    text: string;
    controlledBy: string | null;
}

interface ApiContextProps {
    userId: string;
    status: ApiStatus;
    createItem: () => void,
    focusItem: (id: string) => void,
    blurItem: (id: string) => void,
    updateItem: (id: string, text: string) => void,
    removeItem: (id: string) => void,
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

const socket = io('https://ubiquity-todolist-server.herokuapp.com/');

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
        socket.on(ApiEvent.LIST, (data: TodoItem[]) => {
            setItems(data);
        });
        socket.on(ApiEvent.CREATE, (data: TodoItem) => {
            setItems(items => items.concat(data));
        })
        socket.on(ApiEvent.UPDATE, (data: TodoItem) => {
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
        socket.on(ApiEvent.REMOVE, (data: TodoItem) => {
            setItems(items => items.filter(item => item._id !== data._id));
        })
    }, []);

    const sendId = useCallback((event: ApiEvent, id: string) => {
        socket.emit(event, {id});
    }, []);

    const createIdEventHandler = (event: ApiEvent) => (id: string) => sendId(event, id);

    const createItem = useCallback(() => {
        socket.emit(ApiEvent.CREATE);
    }, []);

    const updateItem = useCallback((id: any, text: string) => {
        socket.emit(ApiEvent.UPDATE, {id, text});
    }, []);

    return (
        <ApiContext.Provider value={{
            userId: socket.id,
            status,
            createItem,
            updateItem,
            focusItem: createIdEventHandler(ApiEvent.FOCUS),
            blurItem: createIdEventHandler(ApiEvent.BLUR),
            removeItem: createIdEventHandler(ApiEvent.REMOVE),
            items,
        }}>
            {children}
        </ApiContext.Provider>
    );
}

export function useApi(): ApiContextProps {
    const context = React.useContext<ApiContextProps>(ApiContext);
    if(!context) {
        throw new Error("useApi must be used within ApiProvider")
    }
    return context;
}