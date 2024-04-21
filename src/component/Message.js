import { View, Text, StyleSheet } from "react-native";

export const  Message=({ children })=> {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{children}</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 3,
        marginTop:90,
        // textAlign:'auto',
        justifyContent: 'flex-start',
        backgroundColor: 'powderblue',
        
    },
    text:{
        color:'black',
        fontSize:20,
        textAlign:'center',

    },
});
export default Message;