import { StyleSheet, Text, View, Alert, FlatList, Image, Pressable, ScrollView, ActivityIndicator } from 'react-native';

import { useEffect } from 'react';
import { ImageButton } from '../component/ImageButton';
import { useDispatch, useSelector } from "react-redux";
import { loadproductDetailbody, selectProductDetail } from '../redux/productDetailSlice';
import { dataToServer, selectCart } from '../redux/shoppingCartSlice';
import { logDelail } from '../redux/signSlice';
 
export default ProductDetails = function ({ navigation, route }) {
    const { logData, token } = useSelector(logDelail);
    
    const dispatch = useDispatch();
    const { productDetailbody, rating, loading, error } = useSelector(selectProductDetail);
    // const { orderData } = useSelector(selectOrder);
    const { cartData } = useSelector(selectCart);

 
    const goHome = () => {
        navigation.navigate('ProductList', { category: route.params?.category })
    }
    const addCart = () => {
        let quantities = 0;
        if (cartData.some(x => x.id == productDetailbody.id))
            quantities = cartData.find(x => x.id == productDetailbody.id).quantity;
        let tot = cartData.reduce((total, item) => total + item.quantity, 0);
        
        const proCount = {
            ...productDetailbody,
            quantity: quantities + 1,
            token: token
        };
        let load = [...cartData];
        
        const productExists = load.some(
            (item) => item.id === productDetailbody.id
        );
        if (!productExists) {
            load.push(proCount);
        } else {
            const productIndex = load.findIndex(
                (item) => item.id === productDetailbody.id
            );
            
            load[productIndex] = { ...load[productIndex], "quantity": proCount.quantity };
        }
        let filteredArray = load.map((item) => { return { ...item, token: token }; });
        
        dispatch(dataToServer(filteredArray, tot+1));
    };
    useEffect(() => {
        dispatch(loadproductDetailbody(route.params?.id));
 
    }, []);
    return (
        <View style={[styles.container, { flexDirection: 'column' }]}>
 
            <View style={styles.body}>
                {loading ? (
                    <ActivityIndicator size="large" color="green" style={{ flex: 1 }} />
                ) : (
                    <ScrollView>
                        <View style={{ margin: 10, flexDirection: 'column', width: 370, borderWidth: 1, borderColor: 'green', borderRadius: 10 }}>
                            <Image source={{ uri: productDetailbody.image }} style={styles.imageStyle} />
                            <Text style={{ fontSize: 20, fontWeight: '700', margin: 5 }}>{productDetailbody.title}</Text>
                            <View style={{ margin: 10, height: 40, borderWidth: 1, borderColor: 'green', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <Text style={{ fontSize: 15, fontWeight: '700', marginTop: 10 }}>Rate: {rating.rate}</Text>
                                <Text style={{ fontSize: 15, fontWeight: '700', marginTop: 10 }}>Sold: {rating.count}</Text>
                                <Text style={{ fontSize: 15, fontWeight: '700', marginTop: 10 }}>Price: $ {productDetailbody.price}</Text>
                            </View>
                            <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <ImageButton text="Back" icon="backspace" width={100} fun={goHome} />
                                <ImageButton text="Add To Cart" icon="cart" width={150} fun={addCart} />
                            </View>
                            <View style={{ margin: 10, flexDirection: 'column' }}>
                                <Text style={{ fontSize: 18, fontWeight: '700' }}>Description:</Text>
                                <Text style={{ fontSize: 15, fontWeight: '700' }}>{productDetailbody.description}</Text>
                            </View>
                        </View>
                    </ScrollView>
                )}
            </View>
 
        </View>
    );
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        paddingTop: 0,
        flexDirection: 'row'
    },
    header: {
        flex: 1,
        borderColor: 'green',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 40,
        borderRadius: 20
    },
    body: {
        flex: 9,
        width: 380
    },
    imageStyle: {
        margin: 10,
        width: 300,
        height: 300,
        borderWidth: 1,
        borderColor: 'lightgreen',
        borderRadius: 10,
        justifyContent: 'center',
        alignSelf: 'center'
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