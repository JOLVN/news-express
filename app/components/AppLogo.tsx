import { Image, Pressable, ViewProps } from "react-native"

type Props = ViewProps &{
    onPress: () => void
}

export default function AppLogo({style, onPress}: Props) {
    return (
        <Pressable onPress={onPress} style={style}>
            <Image source={require("../assets/images/app-logo.png")} style={{width: 40, height: 42}} />
        </Pressable>
    )
}