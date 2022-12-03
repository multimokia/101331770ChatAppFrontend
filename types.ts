import { Dispatch, SetStateAction } from "react"
import { Socket } from "socket.io-client"

export interface IUser extends IPrismaUser {
    channels: IChannel[]
    messages: IMessage[]
    channelMemberProps: IChannelUserAdditionalProps[]
}

export interface IChannel {
    id: number
    name: string
    members: IUser[]
    messages: IMessage[]
    channelMemberProps: IChannelUserAdditionalProps[]
}

export interface IChannelUserAdditionalProps {
    id: number
    nickname: string

    userId: number
    user: IUser

    channelId: number
    channel: IChannel
}

export interface IPrismaMessage {
    id?: number
    content: string
    isEdited: boolean
    timeSent: Date
    authorId: number
    channelId: number
}

export interface IPrismaUser {
    id: number
    email: string
    username: string
    password: string
    avatarB64: string
}

export interface IRequestResponsePrismaMessage extends IPrismaMessage {
    author: IPrismaUser
}


export interface IMessage extends IRequestResponsePrismaMessage {
    channel: IChannel
}

export interface ServerToClientEvents {
    serverBroadcastsUserConnected: (userId: number) => void;
    serverBroadcastsUserDisconnected: (userId: number) => void;

    serverBroadcastsUserJoin: (user: IUser, channel: IChannel) => void;
    serverBroadcastsUserLeave: (user: IUser, channel: IChannel) => void;

    serverBroadcastsUserSentMessage: (message: IMessage) => void;
}

export interface ClientToServerEvents {
    userConnected: (userId: number) => void;
    userDisconnected: (userId: number) => void;

    userJoined: (user: IUser, channelId: number) => void;
    userLeft: (user: IUser, channelId: number) => void;

    userSendsMessage: (message: IPrismaMessage) => void;
}

export interface ChatNavContextData {
    headerTitle: string;
    socket: Socket<ServerToClientEvents, ClientToServerEvents>;
    token: string;
    currentUser: IUser | null;
}

export interface ChatNavCtxSetterCtxData {
    setContext: Dispatch<SetStateAction<ChatNavContextData>>;
}

export interface GenericSetStateContext<T> {
    setState: Dispatch<SetStateAction<T>>
}

export type AtMeRequestChannelReturn = {
    id: number,
    name: string
}

export interface AtMeRequestResponse extends IPrismaUser {
    channels: AtMeRequestChannelReturn[]
}
