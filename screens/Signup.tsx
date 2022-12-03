import { Text, View } from '../components/Themed';
import { product, styles } from "../styles";
import { useForm, Controller } from "react-hook-form";
import React, { useState } from 'react';
import { Button, TextInput } from 'react-native';
import { Keyboard } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import axios from 'axios';
import { useToast } from 'react-native-toast-notifications';

interface ISignupFormData {
    username: string
    email: string
    password: string
    confirmPassword: string
}

interface IKeyboardAffectedResizeProps {
    headerSize: number
    inputWrapperPadding: number
    shouldDivide: boolean
    topBottomMarginBump: number
}

export const SignupScreen: React.FC<{navigation: NativeStackNavigationProp<RootStackParamList>}> = ({ navigation }) => {
    const toast = useToast();
    const { control, handleSubmit, setError, formState: { errors} } = useForm<ISignupFormData>();
    const [resizeableData, setResizeableData] = useState<IKeyboardAffectedResizeProps>({
        headerSize: styles.title.fontSize,
        inputWrapperPadding: styles.input.padding,
        shouldDivide: true,
        topBottomMarginBump: 0
    });

    const onSubmit = (data: ISignupFormData) => {
        if (data.password !== data.confirmPassword) {
            setError("password", { message: "Passwords do not match." });
            setError("confirmPassword", { message: "Passwords do not match." });
            return;
        }

        axios.post("http://23.133.249.130:9999/api/v1/users/signup", data)
            .then((result) => {
                console.log(result);
                navigation.navigate("Login");
                toast.show("Successfully created.", { type: "success"});
            })
            .catch((err) => {
                toast.show(err.response.data.error, {type: "danger"});
                setError(err.response.data.errField, {message: "Email in use."})
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
                    borderColor: product.themeDark.textLabel,
                    borderWidth: 1,
                    marginTop: "20%",
                    marginBottom: "20%"
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
                        name="username"
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={{
                                    ...styles.input,
                                    ...(errors.username ? styles.inputError : {})
                                }}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                placeholder="Username..."
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
                        name="email"
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={{
                                    ...styles.input,
                                    ...(errors.email ? styles.inputError : {})
                                }}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                placeholder="Email..."
                                placeholderTextColor={product.themeDark.inputPlaceholderTextColor}
                            />
                        )}
                        rules={{
                            required: "Email is required."
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

                <View
                    style={{
                        ...styles.inputWrapper,
                        paddingTop: resizeableData.inputWrapperPadding,
                        paddingBottom: resizeableData.inputWrapperPadding
                    }}
                >
                    <Controller
                        name="confirmPassword"
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                            style={{
                                ...styles.input,
                                ...(errors.confirmPassword ? styles.inputError : {})
                            }}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                secureTextEntry={true}
                                placeholder="Password confirmation..."
                                placeholderTextColor={product.themeDark.inputPlaceholderTextColor}
                            />
                        )}
                        rules={{
                            required: "Please confirm your password."
                        }}
                    />
                </View>

                {resizeableData.shouldDivide && <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />}

                <View style={{width: "45%", marginTop: resizeableData.topBottomMarginBump}}>
                    <Button title="Create account" color={product.themeDark.buttonPositive} onPress={handleSubmit(onSubmit)}/>
                </View>
            </View>
        </View>
    );
}
