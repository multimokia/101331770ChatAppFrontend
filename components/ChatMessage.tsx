import { Text, View } from '../components/Themed';
import { product, styles } from "../styles";
import { IMessage, IPrismaMessage, IRequestResponsePrismaMessage } from "../types";
import { Image } from "react-native";
import { DateString } from './DateString';

export const ChatMessageHeader: React.FC<{messageData: IRequestResponsePrismaMessage}> = ({ messageData }) => {
    if (typeof(messageData.timeSent) === "string") {
        messageData.timeSent = new Date(messageData.timeSent);
    }

    return (
        <View style={{
            ...styles.chatMessageContainer,
            paddingTop: 20,
            paddingHorizontal: 10,
            borderRadius: 20,
            marginTop: 2,
            backgroundColor: "transparent"
        }}>
            <View style={{flex: 1, flexDirection: "row"}}>
                <Image
                    style={{
                        width: 48,
                        height: 48,
                        borderRadius: 40
                    }}
                    source={{uri: messageData.author.avatarB64}}
                />
                <View style={{marginRight: 40}}>
                    <Text style={{...styles.label, color: product.themeDark.inputPlaceholderTextColor, marginLeft: 10}}>
                        <Text style={{...styles.label, fontWeight: "bold"}}>{messageData.author.username}</Text> - <DateString date={messageData.timeSent} style={{...styles.label, color: product.themeDark.inputPlaceholderTextColor}}/>
                        {messageData.isEdited ? " (edited)" : ""}
                    </Text>
                    <Text style={{...styles.label, marginLeft: 10, marginTop: 7}}>{messageData.content}</Text>
                </View>
            </View>
        </View>
    );
};

export const ChatMessageFollowup: React.FC<{messageData: IRequestResponsePrismaMessage}> = ({ messageData }) => {
    return (
        <View style={{
            ...styles.chatMessageContainer,
            paddingVertical: 2,
            paddingHorizontal: 10,
            borderRadius: 20,
            backgroundColor: "transparent"
        }}>
            <Text style={{...styles.label, marginLeft: 58}}>{messageData.content}</Text>
        </View>
    )
};
