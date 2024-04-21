import { Text, View, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";


export const ImageButton = ({ text, icon, disabled, width = 150, color='black', back='yes', fun = () => console.log("clicked") }) => {
    return (
        <Pressable
            style={({ pressed }) => (pressed || disabled ? { opacity: 0.5 } : {})}
            onPress={fun}
            disabled={disabled}
        >
            {back=='yes' && <View style={[styles.container,{width:width}]}>
                <Ionicons name={icon} size={30} color={color} />
                <Text style={styles.text}>{text}</Text>
            </View>}
            {back=='no' && <View >
                <Ionicons name={icon} size={30} color={color} />
                <Text style={styles.text}>{text}</Text>
            </View>}
            
        </Pressable >
    );
};
const styles = StyleSheet.create({
    container: {
        // width: 150,
        height: 40,
        backgroundColor: "#5ab53c",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"

    },
    text: {
        color: 'black'
    }

})