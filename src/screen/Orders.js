import { StyleSheet, Text, View, Alert, FlatList, Image, Pressable, ActivityIndicator } from 'react-native';

import { ImageButton } from '../component/ImageButton';
import { useDispatch, useSelector } from "react-redux";
import { addCartData, deleteCartData, selectCart } from "../redux/shoppingCartSlice";

export default Orders = function ({ navigation }) {
    const { cartData, sum, price } = useSelector(selectCart);
    const dispatch = useDispatch();
    const onAdd = (id) => {
        let quantities = 1;
        if (cartData.some(x => x.id == id))
            quantities = cartData.find(x => x.id == id).quantity;
        let tot = cartData.reduce((total, item) => total + item.quantity, 0);
        let total = tot + 1;
        let productDetailData = cartData.find(x => x.id == id);
        
        const productWithQuantity = {
            ...productDetailData,
            quantity: quantities
        };
        dispatch(addCartData(productWithQuantity, total));
    };
  
 
    
    const onDelete = (id) => {
        dispatch(deleteCartData(id));
    };
    return (
        <View style={[styles.container, { flexDirection: 'column' }]}>
            <View style={styles.header}>
                <Text style={{ fontSize: 30, fontWeight: '700' }}>Shopping Cart</Text>
            </View>
            {sum != 0 && <View style={styles.pricing}>
                <Text style={{ fontSize: 20 }}>Items: <Text style={{ fontWeight: '700' }}>{sum}</Text></Text>
                <Text style={{ fontSize: 20 }}>Total Price: <Text style={{ fontWeight: '700' }}>$ {price}</Text></Text>
            </View>}
            {sum == 0 ? (<View style={{ flex: 8, justifyContent: 'center', alignSelf: 'center', alignContent: 'center' }}>
                <Text style={{ fontSize: 30, fontWeight: '500' }}>Your shopping cart is empty!</Text>
            </View>) : (
                <View style={styles.body}>
                    <FlatList
                        data={cartData}
                        renderItem={({ item  }) => (
                            <View style={{ margin: 10, flexDirection: 'column', width: 370, borderWidth: 2, borderColor: 'green', borderRadius: 10 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={{ uri: item.image }} style={styles.image} />
                                    <View style={{ margin: 10, flexDirection: 'column' }}>
                                        <Text style={{ fontSize: 15, fontWeight: '700', width: 270 }}>{item.title}</Text>
                                        <Text style={{ fontSize: 15, fontWeight: '700' }}>Price: $ {item.price}</Text>
                                        <View style={{ flexDirection: 'row', }}>
                                            <ImageButton icon="remove-circle" width={50} height={30} fun={() => onDelete(item.id)} />
                                            <Text style={{ fontSize: 15, marginTop: 5 }}> Quantity: <Text style={{ fontWeight: '700' }}>{item.quantity} </Text></Text>
                                            <ImageButton icon="add-circle" width={50} height={30} fun={() => onAdd(item.id)} />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            )}
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
        borderColor: 'green',
        backgroundColor: 'lightgreen',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        // margin: 40,
        borderRadius: 20,
        marginRight: 10,
        marginLeft: 10
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