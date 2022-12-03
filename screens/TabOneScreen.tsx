import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { product, styles } from "../styles";
import { LoginScreen } from './Login';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
    return (
        <LoginScreen/>
    );
}
