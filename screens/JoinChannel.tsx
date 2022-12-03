import { Text, View } from "../components/Themed";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { product, styles } from "../styles";
import { Controller, useForm } from "react-hook-form";
import React, { useContext } from "react";
import { Button, TextInput } from "react-native";
import axios from "axios";
import { ChatNavigationContext } from "../hooks/context";
import { useToast } from "react-native-toast-notifications";

type JoinChannelFormData = {
    uuid: string;
}

export const JoinChannelScreen: React.FC<{navigation: NativeStackNavigationProp<RootStackParamList>, route: any}> = ({ navigation, route }) => {
    const toast = useToast();
    const { control, handleSubmit, setError, formState: { errors } } = useForm<JoinChannelFormData>();
    const ctx = useContext(ChatNavigationContext);

    const onSubmit = (data: JoinChannelFormData) => {
        axios.get(
            `http://23.133.249.130:9999/api/v1/invite/${data.uuid}`,
            { headers: { authorization: ctx.token }}
        )
            .then((response) => {
                toast.show("Channel joined successfully", { type: "success" });
                route.params.refetch();
                navigation.navigate("Backsplash");
            })
            .catch((err) => {
                console.log(err);
                setError("uuid", { message: "Invalid invite code"});
                toast.show(err.response.data.error, { type: "danger" });
            });
    }

    return (
        <View style={{...styles.container, borderRadius: 0}}>
            <View
                style={{
                    ...styles.container,
                    backgroundColor: product.themeDark.backgroundSecondary,
                    width: "80%",
                    height: "50%",
                    marginTop: "25%",
                    marginBottom: "25%",
                    borderColor: product.themeDark.textLabel,
                    borderWidth: 1
                }}
            >
                <Text style={styles.title}>
                    Join Channel
                </Text>
                <View style={styles.inputWrapper}>
                    <Controller
                        name="uuid"
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={{
                                    ...styles.input,
                                    ...(errors.uuid ? styles.inputError : {})
                                }}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                placeholder="Invite code..."
                                placeholderTextColor={product.themeDark.inputPlaceholderTextColor}
                            />
                        )}
                        rules={{ required: "Invite code is required." }}
                    />
                </View>

                <View style={{width: "35%"}}>
                    <Button title="Join!" color={product.themeDark.buttonPositive} onPress={handleSubmit(onSubmit)}/>
                </View>
            </View>
        </View>
    )
}
