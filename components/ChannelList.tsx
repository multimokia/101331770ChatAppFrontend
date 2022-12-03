import { View } from '../components/Themed';
import { product, styles } from "../styles";
import React, { useContext, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { Entypo } from '@expo/vector-icons';
import { AtMeRequestResponse } from '../types';
import { ChatNavigationContext } from '../hooks/context';
import { FlashList } from '@shopify/flash-list';
import { useToast } from 'react-native-toast-notifications';
import { ChannelListItem } from './ChannelListItem';
import { useFetch } from '../hooks/useFetch';

export const ChannelList: React.FC<{navigation: NativeStackNavigationProp<RootStackParamList>}> = ({ navigation }) => {
    const toast = useToast();
    const ctx = useContext(ChatNavigationContext);
    const { data, refetch, error } = useFetch<AtMeRequestResponse>(
        "http://23.133.249.130:9999/api/v1/users/@me",
        {headers: { authorization: ctx.token } }
    );

    if (error) {
        toast.show(error, { type: "danger" });
    }

    return (
        <View style={{
            ...styles.container,
            backgroundColor: "#181728",
            width: "100%",
            padding: 5,
            justifyContent: undefined,
            alignItems: undefined,
            borderRadius: 0,
            flex: 1
        }}>
            <FlashList
                data={data.channels}
                estimatedItemSize={80}
                renderItem={({item}) => {
                    return (
                        <ChannelListItem item={item} navigation={navigation}/>
                    );
                }}
            />
            <TouchableOpacity
                    style={{
                        borderWidth: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 70,
                        position: 'absolute',
                        bottom: "10%",
                        right: 20,
                        height: 70,
                        backgroundColor: product.themeDark.backgroundSecondary,
                        borderRadius: 100,
                    }}
                    onPress={() => { navigation.navigate("CreateOrJoinChannel", { refetch }); }}
                >
                    <Entypo name="plus" size={35} color={product.themeDark.textLabel} />
                </TouchableOpacity>
        </View>
    );
}
