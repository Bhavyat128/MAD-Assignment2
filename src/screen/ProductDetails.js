import { StyleSheet, Text, View, Alert, FlatList, Image, Pressable, ScrollView, ActivityIndicator } from 'react-native';

import { useEffect } from 'react';
import { ImageButton } from '../component/ImageButton';
import { useDispatch, useSelector } from "react-redux";
import { loadproductDetailbody, selectProductDetail } from '../redux/productDetailSlice';

import { addCartData, selectCart } from '../redux/shoppingCartSlice';
 
export default ProductDetails = function ({ navigation, route }) {
   
    const dispatch = useDispatch();
    const { productDetailbody, rating, loading, error } = useSelector(selectProductDetail);
    
    const { cartData } = useSelector(selectCart);
 
    useEffect(() => {
        dispatch(loadproductDetailbody(route.params?.id));
 
    }, []);
 
    const onBack = () => {
        navigation.navigate('ProductList', { category: route.params?.category })
    }
    const onAddCart = () => {

        let quantities = 1;
        if (cartData.some(x => x.id == productDetailbody.id))
            quantities = cartData.find(x => x.id == productDetailbody.id).quantity;
        let add = cartData.reduce((sum, item) => sum + item.quantity, 0);
        let sum = add + 1;
        
        const productWithQuantity = {
            ...productDetailbody,
            quantity: quantities
        };
        dispatch(addCartData(productWithQuantity,sum));
    };
    return (
        <View style={[styles.container,  { flexDirection: 'column' }]}>
 
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
                                <ImageButton text="Back" icon="backspace" width={100} fun={onBack} />
                                <ImageButton text="Add To Cart" icon="cart" width={150} fun={onAddCart} />
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