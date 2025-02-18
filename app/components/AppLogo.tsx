import { Image, Pressable, StyleSheet, ViewProps } from "react-native"

type Props = ViewProps &{
    onPress: () => void
}

export default function AppLogo({style, onPress}: Props) {
    return (
        <Pressable onPress={onPress} style={[style, styles.container]}>
            <Image source={require("../assets/images/app-logo.png")} style={{width: 40, height: 42}} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 40,
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
    }
})