import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { ChannelList } from '../components/ChannelList';
import { MenuProvider } from 'react-native-popup-menu';

export const BackSplashScreen: React.FC<{navigation: NativeStackNavigationProp<RootStackParamList>}> = ({ navigation }) => {
    return (
        <MenuProvider>
            <ChannelList navigation={navigation}/>
        </MenuProvider>
    );
}
