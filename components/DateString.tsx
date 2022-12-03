import { Text } from '../components/Themed';
import { StyleProp, TextStyle } from "react-native";

export const DateString: React.FC<{date: Date, style?: StyleProp<TextStyle>}> = ({date, style}) => {
    return (
        <Text style={style}>{`${(date.getHours() % 12)}:${(date.getMinutes()).toString().padStart(2,"0")} ${date.getHours() >= 12 ? "PM" : "AM"}`}</Text>
    )
}
