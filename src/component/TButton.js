import { StyleSheet, Text, Button, View } from 'react-native';


export const TButton = function ({ titles, navigation }) {
    return (
        <View style={styles.container}>
           <Button  title={titles} onPress={()=>navigation.navigate(titles)}/>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginBottom:80,
    },
});
export default TButton;