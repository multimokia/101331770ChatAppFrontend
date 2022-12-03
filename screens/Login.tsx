import { Text, View } from '../components/Themed';
import { product, styles } from "../styles";
import { useForm, Controller } from "react-hook-form";
import React, { useContext, useState } from 'react';
import { Button, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import axios from 'axios';
import { useToast } from 'react-native-toast-notifications';
import { ChatNavigationContext, ChatNavigationCtxSetter } from '../hooks/context';

interface ILoginFormData {
    email: string
    password: string
}

interface IKeyboardAffectedResizeProps {
    headerSize: number
    inputWrapperPadding: number
    shouldDivide: boolean
    topBottomMarginBump: number
}

export const LoginScreen: React.FC<{navigation: NativeStackNavigationProp<RootStackParamList>}> = ({ navigation }) => {
    const toast = useToast();

    const { control, handleSubmit, setError, formState: { errors } } = useForm<ILoginFormData>();
    const [resizeableData, setResizeableData] = useState<IKeyboardAffectedResizeProps>({
        headerSize: styles.title.fontSize,
        inputWrapperPadding: styles.input.padding,
        shouldDivide: true,
        topBottomMarginBump: 0
    });

    const ctx = useContext(ChatNavigationContext);
    const { setContext } = useContext(ChatNavigationCtxSetter);

    const onSubmit = (data: ILoginFormData) => {
        axios.post("http://23.133.249.130:9999/api/v1/users/login", data)
            .then((result) => {
                setContext({...ctx, token: result.data.token, currentUser: result.data.user});
                navigation.navigate("Backsplash");
            })

            .catch((err) => {
                toast.show(err.response.data.message, { type: "danger"});
                setError("email", {message: "Invalid credentials"});
                setError("password", {message: "Invalid credentials"});
            });
    }

    Keyboard.addListener("keyboardDidShow", (event) => {
        setResizeableData({
            headerSize: styles.title.fontSize / 2,
            inputWrapperPadding: styles.input.padding / 2,
            shouldDivide: false,
            topBottomMarginBump: 30
        });
    });

    Keyboard.addListener("keyboardDidHide", (event) => {
        setResizeableData({
            headerSize: styles.title.fontSize,
            inputWrapperPadding: styles.input.padding,
            shouldDivide: true,
            topBottomMarginBump: 0
        })
    });

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
                <Text
                    style={{
                        ...styles.title,
                        fontSize: resizeableData.headerSize,
                        marginBottom: resizeableData.topBottomMarginBump
                    }}
                >
                        THISCHORD
                </Text>
                {resizeableData.shouldDivide && <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />}

                <View
                    style={{
                        ...styles.inputWrapper,
                        paddingTop: resizeableData.inputWrapperPadding,
                        paddingBottom: resizeableData.inputWrapperPadding
                    }}
                >
                    <Controller
                        name="email"
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={{
                                    ...styles.input,
                                    ...(errors.email ? styles.inputError : {})
                                }}
                                keyboardType="email-address"
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                placeholder="Email..."
                                placeholderTextColor={product.themeDark.inputPlaceholderTextColor}
                            />
                        )}
                        rules={{
                            required: "Username is required."
                        }}
                    />
                </View>

                <View
                    style={{
                        ...styles.inputWrapper,
                        paddingTop: resizeableData.inputWrapperPadding,
                        paddingBottom: resizeableData.inputWrapperPadding
                    }}
                >
                    <Controller
                        name="password"
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={{
                                    ...styles.input,
                                    ...(errors.password ? styles.inputError : {})
                                }}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                secureTextEntry={true}
                                placeholder="Password..."
                                placeholderTextColor={product.themeDark.inputPlaceholderTextColor}
                            />
                        )}
                        rules={{
                            required: "Password is required."
                        }}
                    />
                </View>

                {resizeableData.shouldDivide && <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />}

                <View style={{width: "35%"}}>
                    <Button title="login" color={product.themeDark.buttonPositive} onPress={handleSubmit(onSubmit)}/>
                </View>

                <View style={{...styles.linkButton, marginTop: resizeableData.topBottomMarginBump}}>
                    <TouchableOpacity
                        style={styles.linkButton}
                        onPress={() => {navigation.navigate("Signup")}}
                    >
                        <Text style={styles.label}>Need an account?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
