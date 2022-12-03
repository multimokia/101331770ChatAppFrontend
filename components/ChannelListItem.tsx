import { Text } from "./Themed";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import React, { useContext } from "react";
import { ImageBackground, TouchableOpacity, Clipboard } from "react-native";
import { RootStackParamList } from "../App";
import { ChatNavigationContext } from "../hooks/context";
import { product, styles } from "../styles";
import { AtMeRequestChannelReturn } from "../types";
import { Entypo } from '@expo/vector-icons';
import axios from "axios";
import { useToast } from "react-native-toast-notifications";

export const ChannelListItem: React.FC<{
    navigation: NativeStackNavigationProp<RootStackParamList>,
    item: AtMeRequestChannelReturn
}> = ({navigation, item}) => {
    const toast = useToast();
    const ctx = useContext(ChatNavigationContext);

    return (
        <ImageBackground
            style={{ borderRadius: 5, marginVertical: 5 }}
            source={{uri: "https://raw.githubusercontent.com/hurabono/Moki-Musicfolio/main/src/img/bg-path.png"}}
        >
            <LinearGradient
                colors={[product.themeDark.backgroundSecondary, "transparent"]}
                start={{x: 0.25, y: 0.5}}
                end={{x: 0.8, y: 0.5}}
                style={{
                    flex: 1,
                    flexDirection: "row"
                }}
            >
                <TouchableOpacity
                    style={{
                        backgroundColor: "transparent",
                        padding: 20,
                        borderRadius: 5,
                        justifyContent: "center",
                        flexGrow: 0.9
                    }}
                    onPress={() => {
                        navigation.navigate("Chat", { channelId: item.id });
                    }}
                >
                    <Text style={[styles.title, {justifyContent: "center"}]}>{item.name}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{justifyContent: "center"}}
                    onPress={() => {
                        console.log(`itemData: ${JSON.stringify(item)}`)
                        axios.post(
                            "http://23.133.249.130:9999/api/v1/invite/create",
                            { channelId: item.id },
                            { headers: { authorization: ctx.token } }
                        )
                            .then((response) => {
                                console.log(response.data);
                                // NOTE: Because we're using expo, we're *forced* to use the deprecated package vs the libraries
                                Clipboard.setString(response.data.url);
                                toast.show("Successfully copied invite code.", { type: "success" });
                            })
                            .catch((err) => {
                                console.log(err);
                                toast.show(err.response?.data.message || "An error occurred.", {type: "danger"})
                            })
                    }}
                >
                    <Entypo name="share" size={30} color={product.themeDark.textHeader} />
                </TouchableOpacity>
            </LinearGradient>
        </ImageBackground>
    );
}
