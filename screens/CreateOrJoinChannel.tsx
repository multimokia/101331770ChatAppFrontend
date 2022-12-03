import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { TouchableOpacity } from "react-native";
import { RootStackParamList } from "../App";
import { product, styles } from "../styles";
import { Text, View } from "../components/Themed";
import { Ionicons } from '@expo/vector-icons';


export const CreateOrJoinChannelScreen: React.FC<{navigation: NativeStackNavigationProp<RootStackParamList>, route: any}> = ({ navigation, route }) => {
    return (
        <View style={{...styles.container, borderRadius: 0}}>
            <Text
                style={[styles.title, {padding: 0, fontSize: 24, top: 25}]}
            >
                How should we do this?
            </Text>
            <View
                style={{
                    ...styles.container,
                    backgroundColor: product.themeDark.backgroundSecondary,
                    width: "80%",
                    height: "50%",
                    marginTop: "15%",
                    marginBottom: "25%",
                    borderColor: product.themeDark.textLabel,
                    borderWidth: 1,
                    flex: 1,
                    flexDirection: "column"
                }}
            >
                <TouchableOpacity
                    onPress={() => navigation.navigate("CreateChannel", route.params)}
                    style={{
                        width: 200,
                        height: 200,
                        borderRadius: 20,
                        backgroundColor: product.themeDark.backgroundPrimary,
                        margin: 10
                    }}
                >
                    <View style={{flex: 1, width: "100%", height: "100%"}}>
                        <Ionicons
                            name="create-outline"
                            size={128}
                            color={product.themeDark.textHeader}
                            style={{
                                marginLeft: 45,
                            }}
                        />
                        <Text style={[styles.label, {textAlign: "center"}]}>Create a channel</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("JoinChannel", route.params)}
                    style={{
                        width: 200,
                        height: 200,
                        borderRadius: 20,
                        backgroundColor: product.themeDark.backgroundPrimary,
                        margin: 10
                    }}
                >
                    <View style={{flex: 1, width: "100%", height: "100%"}}>
                        <Ionicons
                            name="enter-outline"
                            size={128}
                            color={product.themeDark.textHeader}
                            style={{
                                marginLeft: 22,
                            }}
                        />
                        <Text style={[styles.label, {textAlign: "center"}]}>Join a channel</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}
