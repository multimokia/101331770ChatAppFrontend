import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { useState } from 'react';
import { ToastProvider } from 'react-native-toast-notifications';
import { CreateOrJoinChannelScreen } from './screens/CreateOrJoinChannel';
import { ChatNavigationContext, ChatNavigationCtxSetter, defaultContextValue } from './hooks/context';

import useCachedResources from './hooks/useCachedResources';
import { BackSplashScreen } from './screens/Backsplash';
import { ChatScreen } from './screens/Chat';
import { LoginScreen } from './screens/Login';
import { SignupScreen } from './screens/Signup';
import { product } from './styles';
import { ChatNavContextData } from './types';
import { CreateChannelScreen } from './screens/CreateChannel';
import { JoinChannelScreen } from './screens/JoinChannel';


export type RootStackParamList = {
    Login: undefined;
    Signup: undefined;
    Backsplash: undefined;
    NotFound: undefined;
    Chat: { channelId: number };
    CreateOrJoinChannel: {refetch: () => void};
    CreateChannel: {refetch: () => void};
    JoinChannel: {refetch: () => void};
};

export default function App() {
    const [fontloading] = useFonts({
        Renogare: require("./assets/fonts/Renogare.ttf")
    });

    const [ contextData, setContextData ] = useState<ChatNavContextData>(defaultContextValue);

    const isLoadingComplete = useCachedResources() && fontloading;

    if (!isLoadingComplete) {
        return null;
    }

    const Stack = createNativeStackNavigator();

    return (
        <ChatNavigationCtxSetter.Provider value={{setContext: setContextData}}>
            <ChatNavigationContext.Provider value={{...contextData}}>
                <ToastProvider>
                    <NavigationContainer>
                        <Stack.Navigator>
                            <Stack.Screen
                                name="Login"
                                component={LoginScreen}
                                options={{
                                    headerShown: false,
                                    statusBarColor: product.themeDark.backgroundSecondary
                                }}
                            />
                            <Stack.Screen
                                name="Signup"
                                component={SignupScreen}
                                options={{
                                    headerShown: false,
                                    headerShadowVisible: true,
                                    statusBarColor: product.themeDark.backgroundSecondary
                                }}
                            />
                            <Stack.Screen
                                name="CreateOrJoinChannel"
                                component={CreateOrJoinChannelScreen}
                                options={{
                                    headerShown: false,
                                    headerShadowVisible: true,
                                    statusBarColor: product.themeDark.backgroundSecondary
                                }}
                            />
                            <Stack.Screen
                                name="CreateChannel"
                                component={CreateChannelScreen}
                                options={{
                                    headerShown: false,
                                    headerShadowVisible: true,
                                    statusBarColor: product.themeDark.backgroundSecondary
                                }}
                            />
                            <Stack.Screen
                                name="JoinChannel"
                                component={JoinChannelScreen}
                                options={{
                                    headerShown: false,
                                    headerShadowVisible: true,
                                    statusBarColor: product.themeDark.backgroundSecondary
                                }}
                            />
                            <Stack.Screen
                                name="Backsplash"
                                component={BackSplashScreen}
                                options={{
                                    headerShown: true,
                                    headerTitle: "What are we talking?",
                                    headerTintColor: product.themeDark.textLabel,
                                    statusBarColor: product.themeDark.backgroundSecondary,
                                    headerStyle: {
                                        backgroundColor: product.themeDark.backgroundSecondary
                                    }
                                }}
                            />
                            <Stack.Screen
                                name="Chat"
                                component={ChatScreen}
                                options={({route}) => ({
                                    headerShown: true,
                                    // @ts-expect-error This should ALWAYS exist.
                                    headerTitle: route.params!.name,
                                    headerTintColor: product.themeDark.textLabel,
                                    headerStyle: {
                                        backgroundColor: product.themeDark.backgroundSecondary
                                    },
                                    statusBarColor: product.themeDark.backgroundSecondary
                                })}
                            />
                        </Stack.Navigator>
                    </NavigationContainer>
                </ToastProvider>
            </ChatNavigationContext.Provider>
        </ChatNavigationCtxSetter.Provider>
    );
}
