import { StyleSheet, Text, View, Alert, FlatList, Image, Pressable, ActivityIndicator } from 'react-native';
import { ImageButton } from '../component/ImageButton';
import { useDispatch, useSelector } from "react-redux";
import { saveUserCartDataToServer, deleteCartItem, selectCart } from "../redux/shoppingCartSlice";
import { selectLoggedUser } from '../redux/logUserSlice';
import { saveNewOrderForUser } from '../redux/orderSlice';
 
export default Orders = function ({ navigation }) {
    const { logData, token } = useSelector(selectLoggedUser);
    const { cartData, total, price } = useSelector(selectCart);
    const dispatch = useDispatch();
    const onAdd = (id) => {
        let quantities = 0;
        if (cartData.some(x => x.id == id))
            quantities = cartData.find(x => x.id == id).quantity;
        let tot = cartData.reduce((total, item) => total + item.quantity, 0);
        let total = tot + 1;
        
        let productDetailbody = cartData.find(x => x.id == id);
        const productWithQuantity = {
            ...productDetailbody,
            quantity: quantities + 1,
            token: token
        };
        let load = [...cartData];
        const productExists = load.some(
            (item) => item.id === id
        );
        if (!productExists) {
            load.push(productWithQuantity);
        } else {
            const productIndex = load.findIndex(
                (item) => item.id === id
            );
            load[productIndex] = { ...load[productIndex], "quantity": productWithQuantity.quantity };
        }
        let copyLoad = load.map((item) => { return { ...item, token: token }; });
        dispatch(saveUserCartDataToServer(copyLoad, total));
    };
    const onDelete = (id) => {
        let quantities = 0;
        if (cartData.some(x => x.id == id))
            quantities = cartData.find(x => x.id == id).quantity;
        let tot = cartData.reduce((total, item) => total + item.quantity, 0);
        let total = tot - 1;
        
        let productDetailbody = cartData.find(x => x.id == id);
        const productWithQuantity = {
            ...productDetailbody,
            quantity: quantities - 1,
            token: token
        };
        let load = [...cartData];
        const productIndex = load.findIndex(
            (item) => item.id === id
        );
        load[productIndex] = { ...load[productIndex], "quantity": productWithQuantity.quantity };
        let copyLoad = load.map((item) => { return { ...item, token: token }; });
        dispatch(saveUserCartDataToServer(copyLoad, total));
        
    };
    const onCreateOrder = async () => {
        let copyLoad = cartData.map((item) => {
            return { ...item, totalItems: total, totalPrice: price, token: token };
        });
        
        const response = await dispatch(saveNewOrderForUser(copyLoad))
        
        if (response.payload && response.payload.status == "OK") {
            let copyLoads = cartData.map((item) => {
                return { ...item, quantity: 0, totalItems: 0, totalPrice: 0, token: token };
            });
            dispatch(saveUserCartDataToServer(copyLoads));
        }
    }
    return (
        <View style={[styles.container, { flexDirection: 'column' }]}>
            <View style={styles.header}>
                <Text style={{ fontSize: 30, fontWeight: '600', color: 'black' }}>Shopping Cart</Text>
            </View>
            {total != 0 && <View style={styles.pricing}>
                <Text style={{ fontSize: 20 }}>Items: <Text style={{ fontWeight: '700' }}>{total}</Text></Text>
                <Text style={{ fontSize: 20 }}>Total Price: <Text style={{ fontWeight: '700' }}>$ {price}</Text></Text>
            </View>}
            {total == 0 ? (<View style={{ flex: 8, justifyContent: 'center', alignSelf: 'center', alignContent: 'center' }}>
                <Text style={{ fontSize: 30, fontWeight: '500' }}>Your shopping cart is empty!</Text>
            </View>) : (
                <View style={styles.body}>
                    <FlatList
                        data={cartData}
                        renderItem={({ item }) => (
                            <View style={{ margin: 10, flexDirection: 'column', width: 370, borderWidth: 2, borderColor: 'green', borderRadius: 10 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={{ uri: item.image }} style={styles.image} />
                                    <View style={{ margin: 10, flexDirection: 'column' }}>
                                        <Text style={{ fontSize: 15, fontWeight: '700', width: 270 }}>{item.title}</Text>
                                        <Text style={{ fontSize: 15, fontWeight: '700' }}>Price: $ {item.price}</Text>
                                        <View style={{ flexDirection: 'row', }}>
                                            <ImageButton icon="remove-circle" width={30} height={30} fun={() => onDelete(item.id)} />
                                            <Text style={{ fontSize: 15, marginTop: 5 }}> Quantity: <Text style={{ fontWeight: '700' }}>{item.quantity} </Text></Text>
                                            <ImageButton icon="add-circle" width={30} height={30} fun={() => onAdd(item.id)} />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            )}
 
            {total != 0 && <View style={[styles.footer]}>
                <View style={{ margin: 10, justifyContent: 'center', alignContent: 'center', alignSelf: 'center' }}>
                    <ImageButton text=" Checkout" icon="bag-check" width={100} fun={onCreateOrder} />
                </View>
            </View>}
        </View>
    );
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,

        marginTop: 60,
        flexDirection: 'row'
    },
    header: {
        flex: 1,
        borderColor: 'green',
  
        borderWidth: 4,
        borderRadius: 0,
        shadowColor: 'black',
        shadowRadius: 40,
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