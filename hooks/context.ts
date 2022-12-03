import { createContext } from "react";
import { io, Socket } from "socket.io-client";
import { ChatNavContextData, ChatNavCtxSetterCtxData, ClientToServerEvents, GenericSetStateContext, ServerToClientEvents } from "../types";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    "http://23.133.249.130:9999",
    {autoConnect: true, transports: ["websocket"]}
);

export const defaultContextValue: ChatNavContextData = {
    headerTitle: "Chat",
    socket,
    token: "",
    currentUser: null
}

export const ChatNavigationContext = createContext<ChatNavContextData>(defaultContextValue);
export const ChatNavigationCtxSetter = createContext<ChatNavCtxSetterCtxData>({setContext: () => {}});

export const ChannelListContext = createContext({refetch: () => {}});
export const ChannelListSetterContext = createContext<GenericSetStateContext<{setRefetch: () => {}}>>({setState: () => {}});
