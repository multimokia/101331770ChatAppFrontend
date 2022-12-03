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

type CreateChannelFormData = {
    name: string;
}

export const CreateChannelScreen: React.FC<{navigation: NativeStackNavigationProp<RootStackParamList>, route: any}> = ({ navigation, route }) => {
    const toast = useToast();
    const { control, handleSubmit, formState: { errors } } = useForm<CreateChannelFormData>();
    const ctx = useContext(ChatNavigationContext);

    const onSubmit = (data: CreateChannelFormData) => {
        axios.post(
            "http://23.133.249.130:9999/api/v1/channels/new",
            { name: data.name, members: [] },
            { headers: { authorization: ctx.token }}
        )
            .then((response) => {
                toast.show("Channel created successfully", { type: "success" });
                route.params.refetch();
                navigation.navigate("Backsplash");
            })
            .catch((err) => {
                console.error(err);
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
                    Create Channel
                </Text>
                <View style={styles.inputWrapper}>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={{
                                    ...styles.input,
                                    ...(errors.name ? styles.inputError : {})
                                }}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                placeholder="Channel name..."
                                placeholderTextColor={product.themeDark.inputPlaceholderTextColor}
                            />
                        )}
                        rules={{ required: "Channel name is required." }}
                    />
                </View>

                <View style={{width: "35%"}}>
                    <Button title="Create!" color={product.themeDark.buttonPositive} onPress={handleSubmit(onSubmit)}/>
                </View>
            </View>
        </View>
    )
}
