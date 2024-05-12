import { View, Text, StyleSheet } from "react-native";


export const Title = ({ title }) => {
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.text}>{title}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 1,
        marginLeft: 0,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent:'center',
        width: 500,
        height: 500,
    },
    header: {
        fontSize: 10,
        color: 'black',
        borderColor: 'blue',
        justifyContent: 'center',
        alignContent: 'center',
        fontWeight: '500',
        backgroundColor: '#4386E6',
        borderBottomWidth: 4,
        borderRadius: 5,
        textAlign: 'center',

    },
    text: {
        fontSize: 35,
        fontStyle: "italic",
        fontWeight: "500",
        textAlign: "center",
        marginVertical: 5,
    },
    box: {

    }

});
export default Title;