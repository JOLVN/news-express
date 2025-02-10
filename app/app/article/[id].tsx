import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function ArticleDetails() {

    const params = useLocalSearchParams();

    return (
        <View>
            <Text>ArticleDetails {params.id}</Text>
        </View>
    );
}