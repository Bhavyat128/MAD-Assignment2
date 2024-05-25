import { StyleSheet, Text, View, Alert, FlatList, Image, Pressable, ActivityIndicator } from 'react-native';
import { ImageButton } from '../component/ImageButton';
import { useDispatch, useSelector } from "react-redux";
import { signOutUser, selectLoggedUser } from '../redux/logUserSlice';
import { useNavigation, NavigationActions } from "@react-navigation/native";
import { clearCartOnLogout } from '../redux/shoppingCartSlice';
import { signOutUserOrders } from '../redux/orderSlice';
 
export default UserProfile = function () {
    const { logData, token } = useSelector(selectLoggedUser);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const goToUpdatePage = () => {
        navigation.navigate('UpdateUserProfile');
    }
    const resetNavigation = () => {
        navigation.dispatch(
            navigation.reset({
                index: 0, // Set initial tab index (0 for ProductPage)
                routes: [
                    { name: 'ProductPage', params: { initialRouteName: 'Category' } }
                ],
            })
        );
    };
    const onLogout = () => {
        dispatch(clearCartOnLogout());
        dispatch(signOutUser());
        dispatch(signOutUserOrders());
        resetNavigation();
        navigation.navigate('LogInProfile');
    }
    return (
        <View style={[styles.container, { flexDirection: 'column' }]}>
            <View style={styles.header}>
                <Text style={{ fontSize: 30, fontWeight: '700', color: 'white' }}>Update Profile</Text>
            </View>
            <View style={styles.body}>
                <View style={{ flexDirection: 'column', marginLeft: 25 }}>
                    <Text style={{ fontSize: 20, fontWeight: '700' }}>Username: {logData.name}</Text>
                    <Text style={{ fontSize: 20, fontWeight: '700' }}>Email: {logData.email}</Text>
                    <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <ImageButton text=" Update" icon="color-wand-sharp" width={100} fun={goToUpdatePage} />
                        <ImageButton text=" Signout" icon="exit" width={100} fun={onLogout} />
                    </View>
                </View>
            </View>
        </View>
    );
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 0,
        // paddingTop: 0,
        marginTop: 60,
        flexDirection: 'row'
    },
    header: {
        flex: 1,
        // borderColor: 'green',
        backgroundColor: 'green',
        // borderWidth: 4,
        borderRadius: 30,
        shadowColor: 'black',
        shadowRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
    },
    pricing: {
        borderWidth: 2,
        borderColor: 'green',
        backgroundColor: 'lightgreen',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'space-between'
    },
    body: {
        flex: 8,
        width: 380
    },
    image: {
        margin: 10,
        width: 70,
        height: 70,
        borderWidth: 1,
        borderColor: 'lightgreen',
        borderRadius: 10
    },
    footer: {
        flex: 1,
        alignSelf: 'center',
        borderTopWidth: 2,
        width: '100%',
        alignSelf: 'center',
        alignContent: 'center',
        borderBottomColor: 'black'
    }
});