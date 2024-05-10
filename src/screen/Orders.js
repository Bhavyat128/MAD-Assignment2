import { StyleSheet, Text, View } from 'react-native';
 
export default Orders = function () {
    return (
        <View style={styles.container}>
            <Text>This is Order Page!</Text>
        </View>
    );
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});