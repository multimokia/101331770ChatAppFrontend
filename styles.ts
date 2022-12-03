import { StyleSheet } from 'react-native';

export const product = {
    themeDark: {
        backgroundPrimary: "#211f35",
        backgroundSecondary: "#38355b",
        textHeader: "#dcdcdc",
        textLabel: "#989bb5",
        buttonPositive: "#2f9f5b",
        inputBackdrop: "#454274",
        inputPlaceholderTextColor: "#979cb588",
        inputErrorBorder: "#e58291",
        titleFontFamily: "Renogare"
    }
};

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: product.themeDark.backgroundPrimary,
        borderRadius: 16
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: product.themeDark.textHeader,
        fontFamily: product.themeDark.titleFontFamily
    },
    label: {
        fontSize: 15,
        color: product.themeDark.textLabel
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    input: {
        backgroundColor: product.themeDark.inputBackdrop,
        color: product.themeDark.textLabel,
        height: 40,
        padding: 10,
        borderRadius: 4,
        borderColor: product.themeDark.inputBackdrop,
        borderStyle: "solid",
        borderWidth: 1
    },
    inputError: {
        borderWidth: 1,
        borderColor: product.themeDark.inputErrorBorder
    },
    inputWrapper: {
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "transparent",
        width: "80%"
    },
    linkButton: {
        backgroundColor: "transparent",
        color: product.themeDark.textLabel,
        padding: 0
    },
    chatMessageContainer: {
        backgroundColor: "#3e3b5f"
    }
});
