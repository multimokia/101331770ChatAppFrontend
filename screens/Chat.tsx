import { View } from '../components/Themed';
import { product, styles } from "../styles";
import { useForm, Controller } from "react-hook-form";
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { TouchableOpacity, TextInput } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { ChatMessageFollowup, ChatMessageHeader } from '../components/ChatMessage';
import { FontAwesome } from '@expo/vector-icons';
import { IChannel, IMessage, IRequestResponsePrismaMessage } from '../types';
import { ChatNavigationContext } from '../hooks/context';
import axios from 'axios';
import { FlashList } from '@shopify/flash-list';

interface IMessageSubmitForm {
    message: string
}

export const ChatScreen: React.FC<{navigation: NativeStackNavigationProp<RootStackParamList>, route: any}> = ({ navigation, route }) => {
    const [messages, setMessages] = useState<IRequestResponsePrismaMessage[]>([]);
    const { control, handleSubmit } = useForm<IMessageSubmitForm>({shouldUseNativeValidation: true});

    const ctx = useContext(ChatNavigationContext);

    // NOTE: This is TERRIBLE for perf, and I utterly hate this
    // But it's the only way I could manage to not have chat messages overwriting in the view
    const onServerBroadcastsUserSentMessage = (message: IMessage) => {
        axios.get(
            `http://23.133.249.130:9999/api/v1/channels/${route.params.channelId}`,
            {headers: {authorization: ctx.token}}
        )
            .then((resp) => {
                setMessages(resp.data.messages);
            })

            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        axios.get(
            `http://23.133.249.130:9999/api/v1/channels/${route.params.channelId}`,
            {headers: {authorization: ctx.token}}
        )
            .then((resp) => {
                navigation.setParams({ name: resp.data.name})
                setMessages(resp.data.messages);
            })

            .catch((err) => {
                console.log(err);
            });

        ctx.socket.emit("userJoined", ctx.currentUser!, route.params.channelId);

        ctx.socket.on("serverBroadcastsUserSentMessage", onServerBroadcastsUserSentMessage);

        ctx.socket.on("connect_error", (err) => {
            console.error(err);
        });
    }, []);

    const messageEntryBar = React.createRef<TextInput>();

    const onSubmit = (data: IMessageSubmitForm) => {
        ctx.socket.emit(
            "userSendsMessage",
            {
                content: data.message,
                isEdited: false,
                timeSent: new Date(),
                authorId: ctx.currentUser!.id,
                channelId: route.params.channelId
            }
        );

        messageEntryBar.current?.clear();
    };


    return (
        <View
            style={[
                styles.container,
                {
                    borderRadius: 0,
                    width: "100%",
                    flex: 1
                }
            ]}
        >
            <View style={{
                ...styles.container,
                backgroundColor: "#181728",
                width: "100%",
                padding: 5,
                justifyContent: undefined,
                alignItems: undefined,
                borderRadius: 0,
                flex: 1
            }}>
                <FlashList
                    data={messages}
                    estimatedItemSize={60}
                    renderItem={({ item, index }) => {
                        if (index - 1 < 0 || messages[index - 1].authorId !== item.authorId)
                            return <ChatMessageHeader messageData={item} />
                        return <ChatMessageFollowup messageData={item} />
                    }}
                    removeClippedSubviews={true}
                    ListFooterComponent={
                        <View style={{padding: 10}}/>
                    }
                />
            </View>

            <View style={{flex: 0, flexDirection: "row"}}>
                <Controller
                    name="message"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            ref={messageEntryBar}
                            style={{...styles.input, padding: 0, backgroundColor: "transparent", width: "90%", marginTop: 7}}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            placeholder="Say something!"
                            placeholderTextColor={product.themeDark.inputPlaceholderTextColor}
                        />
                    )}
                    rules={{required: true}}
                />
                <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                    style={{
                        paddingVertical: 17,
                        paddingLeft: 7
                    }}
                >
                    <FontAwesome
                        name="send-o"
                        size={20}
                        color={product.themeDark.textHeader}
                        style={{
                            alignSelf: "flex-end",
                            textAlignVertical: "center"
                        }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}
